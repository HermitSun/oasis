<template>
  <div>
    <SearchBar />
    <div class="portrait">
      <div class="profile-module">
        <div class="module">
          <PortraitProfileComp id="portrait" :profile="profile" />
        </div>
        <div class="module">
          <Subtitle title="📉 Citation Trend" />
          <div id="citation-bar" class="content"></div>
        </div>
        <div class="module">
          <Subtitle title="📈 Publication Trends" />
          <div id="publication-bar" class="content"></div>
        </div>
      </div>
      <div class="profile-module">
        <div class="module" style="margin-right: 10px">
          <Subtitle title="🌥 Keywords" />
          <div id="pie" class="chart content"></div>
        </div>
        <div class="module">
          <Subtitle title="🎓 Scholar Network" />
          <div id="force" style="height: 400px"></div>
        </div>
      </div>
    </div>
    <div class="portrait-module">
      <PapersSubtitle
        title="📝 All Papers"
        :sort-key="sortKey"
        @changeSortKey="changeSortKey"
      />
      <div id="papers">
        <div
          v-for="paper in papers"
          :key="paper.id"
          style="margin-bottom: 20px"
        >
          <PaperInfoComp :paper="paper" />
        </div>
      </div>
      <el-pagination
        layout="prev, pager, next"
        :current-page="page"
        :total="size"
        hide-on-single-page
        small
        style="text-align: center; margin-bottom: 10px"
        @current-change="showNextPage"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Pagination, Loading } from 'element-ui';
import SearchBar from '~/components/search/SearchBar.vue';
import Subtitle from '~/components/public/Subtitle.vue';
import PapersSubtitle from '~/components/public/PapersSubtitle.vue';
import PaperInfoComp from '~/components/portrait/PaperInfoComp.vue';
import PortraitProfileComp from '~/components/portrait/PortraitProfileComp.vue';
import {
  getAcademicRelationByAuthorId,
  getAuthorPapersById,
  getAuthorPortraitById,
  getResearcherInterest
} from '~/api';
import { Message } from '~/node_modules/element-ui';
import { AuthorPortraitResponse } from '~/interfaces/responses/portrait/AuthorResponse';
import { AuthorPapersPayload } from '~/interfaces/requests/portrait/author/AuthorPaperPayload';
import { SearchResponse } from '~/interfaces/responses/search/SearchResponse';
import { InterestResponse } from '~/interfaces/responses/interest/InterestResponse';
import { createPieChart } from '~/utils/charts/pie';
import { createForceChart, ForceChartData } from '~/utils/charts/force';
import getSizeById from '~/utils/charts/getSizeById';
import { createBarChart } from '~/utils/charts/bar';
import { AuthorLink, AuthorNode } from '~/pages/charts/index.vue';
import portraitBarConfig from '~/components/portrait/barConfig';
import { sortKey } from '~/interfaces/requests/search/SearchPayload';
import loadingConfig from '~/components/portrait/loadingConfig';

async function requestPortrait(authorId: string) {
  const res: { portrait: AuthorPortraitResponse } = {
    portrait: {} as AuthorPortraitResponse
  };
  try {
    const portraitResponse = await getAuthorPortraitById(authorId);
    res.portrait = portraitResponse.data;
  } catch (e) {
    Message.error(e.toString());
  }
  return res;
}

async function requestPapers(args: AuthorPapersPayload) {
  const res: { papers: SearchResponse[]; size: number } = {
    papers: [],
    size: 0
  };
  try {
    const papersResponse = await getAuthorPapersById(args);
    res.papers = papersResponse.data.papers;
    res.size = papersResponse.data.size;
  } catch (e) {
    Message.error(e.toString());
  }
  return res;
}

async function requestInterests(authorId: string) {
  const res: { interests: InterestResponse[] } = { interests: [] };
  try {
    const interestsResponse = await getResearcherInterest({ authorId });
    res.interests = interestsResponse.data;
  } catch (e) {
    Message.error(e.toString());
  }
  return res;
}

async function requestAcademicRelation(authorId: string) {
  const res: { academicRelation: ForceChartData } = {
    academicRelation: {
      nodes: [],
      links: []
    }
  };
  try {
    const academicRelationResponse = await getAcademicRelationByAuthorId(
      authorId
    );
    res.academicRelation = academicRelationResponse.data;
  } catch (e) {
    Message.error(e.toString());
  }
  return res;
}

export default Vue.extend({
  name: 'Author',
  components: {
    Subtitle,
    PapersSubtitle,
    PaperInfoComp,
    PortraitProfileComp,
    SearchBar,
    [Pagination.name]: Pagination
  },
  async asyncData({ query }) {
    const authorId = query.authorId as string;
    const sortKey = 'recent';
    const page = 1;
    // TODO const sortKey = query.sortKey
    // TODO const page = query.page
    const portraitRes = await requestPortrait(authorId);
    console.log(portraitRes);
    const profile = {
      name: portraitRes.portrait.name,
      statistics: [
        {
          prop: '💻 Affiliation',
          number: portraitRes.portrait.affiliation
        },
        {
          prop: '📝 Papers',
          number: portraitRes.portrait.count
        },
        {
          prop: '📃 Citations',
          number: portraitRes.portrait.citation
        }
      ]
    };
    const citationTrend = portraitRes.portrait.citationTrend;
    const publicationTrend = portraitRes.portrait.publicationTrends;

    const papersReq = requestPapers({ authorId, page, sortKey });
    const interestsReq = requestInterests(authorId);
    // TODO 替换为真实数据
    const academiaRelationReq = requestAcademicRelation('37296968900');
    return {
      ...query,
      authorId,
      profile,
      citationTrend,
      publicationTrend,
      ...(await papersReq),
      ...(await interestsReq),
      ...(await academiaRelationReq)
    };
  },
  data() {
    return {
      page: 1,
      sortKey: 'recent' as sortKey
    } as any;
  },
  mounted() {
    createPieChart(
      '#pie',
      this.interests
        .map((i: { name: string; value: number }) => {
          return {
            label: i.name,
            value: i.value
          };
        })
        .sort(
          (
            a: { name: string; value: number },
            b: { name: string; value: number }
          ) => b.value - a.value
        )
        .slice(0, 20),
      {
        width: getSizeById('pie').width - 20,
        height: getSizeById('pie').height - 20
      }
    );
    createForceChart('#force', this.academicRelation, {
      width: 500,
      height: 500,
      // nodeColor: '#666',
      linkWidth: (_) => 1,
      linkLength: (d) => {
        const link = d as AuthorLink;
        // 限制最大长度
        return link.value * 30 > 200 ? 200 : link.value * 30;
      },
      nodeRadius: (d) => {
        const node = d as AuthorNode;
        // 大小 = 被引数 / 论文数
        // ÷5是为了显示
        const radius = node.citation / node.count / 5;
        return radius < 2 ? 2 : radius;
      },
      tooltip: (d) => {
        const node = d as AuthorNode;
        return `
          <div style="background-color: rgba(153, 153, 153, 0.8); border-radius: 5px">
            <p>name: ${node.name}</p>
            <p>citation: ${node.citation}</p>
            <p>count: ${node.count}</p>
          </div>
        `;
      },
      draggable: true
    });

    createBarChart(
      '#citation-bar',
      this.citationTrend,
      portraitBarConfig(
        document.getElementById('portrait') as any,
        Math.max(...this.citationTrend)
      )
    );
    createBarChart(
      '#publication-bar',
      this.publicationTrend,
      portraitBarConfig(
        document.getElementById('portrait') as any,
        Math.max(...this.publicationTrend)
      )
    );
  },
  methods: {
    async showNextPage() {
      this.page = this.page + 1;
      const loadingInstance = Loading.service(
        loadingConfig(document.getElementById('papers') as any)
      );
      await requestPapers({
        authorId: this.authorId,
        page: this.page,
        sortKey: this.sortKey
      }).then((res) => {
        this.papers = res.papers;
        loadingInstance.close();
      });
    },
    async changeSortKey(newSortKey: sortKey) {
      console.log('newSortKey' + newSortKey);
      this.page = 1;
      this.sortKey = newSortKey;
      const loadingInstance = Loading.service(
        loadingConfig(document.getElementById('papers') as any)
      );
      await requestPapers({
        authorId: this.authorId,
        page: this.page,
        sortKey: this.sortKey
      }).then((res) => {
        this.papers = res.papers;
        loadingInstance.close();
      });
    }
  }
});
</script>
<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
