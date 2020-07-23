<template>
  <div class="author-portrait-wrapper">
    <div v-if="showPortrait" class="portrait">
      <div class="profile">
        <PortraitProfileComp id="portrait" :profile="profile" />
      </div>
      <div class="detail">
        <el-tabs tab-position="top" class="tabs">
          <el-tab-pane label="Statistics" class="tab">
            <template>
              <div class="module" style="flex:1">
                <div class="card-title">
                  <i class="el-icon-data-analysis icon"></i> Citation Amount
                  Statistics
                </div>
                <div id="citation-bar" class="content"></div>
              </div>
              <div class="module" style="flex:1">
                <div class="card-title">
                  <i class="el-icon-data-analysis icon"></i> Publication Amount
                  Statistics
                </div>
                <div id="publication-bar" class="content"></div>
              </div>
              <div class="module" style="margin-right: 10px">
                <div class="card-title">
                  <i class="el-icon-pie-chart icon"></i> Paper Category
                </div>
                <div
                  id="pie"
                  v-loading="isInterestLoading"
                  class="chart content"
                ></div>
              </div>
            </template>
          </el-tab-pane>
          <el-tab-pane label="Scholar Network" class="tab">
            <div class="module">
              <!--<Subtitle title="🎓 Scholar Network" />-->
              <div id="force" class="chart"></div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Related Papers" class="tab">
            <div v-if="showPortrait">
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
              <!--分页-->
              <el-pagination
                layout="prev, pager, next"
                :current-page="page"
                :total="totalRecords"
                :pager-count="pagerSize"
                hide-on-single-page
                small
                style="text-align: center; margin-bottom: 10px"
                @current-change="showNextPage"
              />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Pagination, Loading, Message, Tabs, TabPane, Icon } from 'element-ui';
import PapersSubtitle from '~/components/public/PapersSubtitle.vue';
import PaperInfoComp from '~/components/portrait/PaperInfoComp.vue';
import PortraitProfileComp from '~/components/portrait/PortraitProfileComp.vue';
import {
  getAcademicRelationByAuthorId,
  getAuthorPapersById,
  getAuthorPortraitById,
  getResearcherInterest
} from '~/api';
import { AuthorPortraitResponse } from '~/interfaces/responses/portrait/AuthorResponse';
import { AuthorPapersPayload } from '~/interfaces/requests/portrait/author/AuthorPaperPayload';
import { SearchResponse } from '~/interfaces/responses/search/SearchResponse';
import { InterestResponse } from '~/interfaces/responses/interest/InterestResponse';
import { createPieChart } from '~/components/charts/pie';
import {
  createForceChart,
  ForceChartData,
  ForceChartLink,
  ForceChartNode
} from '~/components/charts/force';
import getSizeById from '~/utils/charts/getSizeById';
import { createBarChart } from '~/components/charts/bar';
import { sortKey } from '~/interfaces/requests/portrait/PortraitPublic';
import loadingConfig from '~/components/portrait/loadingConfig';
import ForceChartClear from '~/components/mixins/ForceChartClear';
import { PortraitAuthorPageComp } from '~/interfaces/pages/portrait/PortraitAuthorPageComp';
import LinkToAuthor from '~/components/mixins/LinkToAuthor';
import PaginationMaxSizeLimit from '~/components/mixins/PaginationMaxSizeLimit';

interface AuthorNode extends ForceChartNode {
  name: string;
  count: number;
  citation: number;
  value: number;
}

interface AuthorLink extends ForceChartLink {
  value: number;
}

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

// 获取数据
async function fetchData(query: AuthorPapersPayload) {
  const authorId = query.authorId as string;
  // 增加默认值
  const sortKey = query.sortKey || 'recent';
  const page = query.page ? Number(query.page) : 1;

  const [portraitRes, papersRes] = await Promise.all([
    requestPortrait(authorId),
    requestPapers({ authorId, page, sortKey })
  ]);

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

  return {
    authorId,
    sortKey,
    page,
    profile,
    citationTrend,
    publicationTrend,
    papers: papersRes.papers,
    resultCount: papersRes.size
  };
}

export default Vue.extend({
  name: 'Author',
  components: {
    [Pagination.name]: Pagination,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [Icon.name]: Icon,
    PaperInfoComp,
    PapersSubtitle,
    PortraitProfileComp
  },
  // 注入一个清理图表的方法
  mixins: [ForceChartClear, LinkToAuthor, PaginationMaxSizeLimit],
  asyncData({ query, redirect }) {
    // 提高健壮性
    if (!query.authorId) {
      redirect('/404');
    }
    return fetchData((query as unknown) as AuthorPapersPayload);
  },
  data() {
    return {
      showPortrait: true,
      // 研究兴趣
      interests: [] as InterestResponse[],
      isInterestLoading: false,
      // 学术关系
      academicRelation: {} as ForceChartData,
      isAcademicRelationLoading: false
    } as PortraitAuthorPageComp;
  },
  watch: {
    async '$route.query'(query) {
      if (!query.authorId) {
        this.$router.push('/404');
      }
      this.showPortrait = false;
      const loading = this.$loading(loadingConfig('.portrait-wrapper'));
      // 重新获取数据
      const data = await fetchData(query as AuthorPapersPayload);
      this.authorId = data.authorId;
      this.page = data.page;
      this.sortKey = data.sortKey;
      this.profile = data.profile;
      this.citationTrend = data.citationTrend; // 被引用趋势
      this.publicationTrend = data.citationTrend; // 发论文趋势
      this.papers = data.papers;
      this.resultCount = data.resultCount;
      // 加载完成后加载图表
      this.showPortrait = true;
      loading.close();
      this.initCharts();
    }
  },
  mounted() {
    this.initCharts();
  },
  methods: {
    // 初始化图表
    initCharts() {
      // 柱状图的开销较小，但是仍然不打算让他阻塞渲染
      setTimeout(() => {
        createBarChart('citation-bar', this.citationTrend);
        createBarChart('publication-bar', this.publicationTrend);
      }, 0);
      // 暂时使用这种方式避免渲染时的阻塞
      // 可能需要重构为组件
      setTimeout(() => {
        this.createInterestChart(this.authorId);
      }, 0);
      setTimeout(() => {
        this.createAcademicRelationChart(this.authorId);
      }, 0);
    },
    // 创建研究兴趣图
    async createInterestChart(authorId: string) {
      // 开始加载
      this.isInterestLoading = true;
      // 取数据
      const interestsRes = await requestInterests(authorId);
      this.interests = interestsRes.interests;
      // 渲染图表
      createPieChart(
        '#pie',
        this.interests
          .map((i) => ({ label: i.name, value: i.value }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 20),
        {
          width: getSizeById('pie').width,
          height: getSizeById('pie').height,
          // 点击后跳转到对应的研究方向画像
          segmentClick: ({ data }) => {
            this.$router.push({
              path: '/portrait/keyword',
              query: {
                keyword: data.label
              }
            });
          }
        }
      );
      // 加载完毕
      this.isInterestLoading = false;
    },
    // 创建学术关系图
    async createAcademicRelationChart(authorId: string) {
      // 开始加载
      this.isInterestLoading = true;
      // 取数据
      const academiaRelationReq = await requestAcademicRelation(authorId);
      this.academicRelation = academiaRelationReq.academicRelation;
      // 渲染图表
      createForceChart('#force', this.academicRelation, {
        width: 600,
        height: 600,
        // nodeColor: '#666',
        linkWidth: (_) => 1,
        linkLength: (d) => {
          const link = d as AuthorLink;
          // 限制最大长度
          return link.value * 50 > 200 ? 200 : link.value * 50;
        },
        nodeRadius: (d) => {
          const node = d as AuthorNode;
          // 根据公式计算出的权重
          const radius = node.value;
          return radius < 2 ? 2 : radius > 20 ? 20 : radius;
        },
        // 这里是没有办法的断言，因为用了mixin
        nodeClick: (d) => {
          (this as any).linkToAuthor(d);
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
        draggable: true,
        noDataPrompt() {
          Message.error('暂无该学者的学术关系🤷🏻');
          return '暂无数据...';
        }
      });
      // 加载完毕
      this.isInterestLoading = false;
    },
    // 展示**指定页码**的内容
    // 这名字起得不好
    showNextPage(page: number) {
      this.page = page;
      this.getPapers();
    },
    changeSortKey(newSortKey: sortKey) {
      console.log('newSortKey' + newSortKey);
      this.page = 1;
      this.sortKey = newSortKey;
      this.getPapers();
    },
    // 获取papers的方法，共用行为
    async getPapers() {
      const loadingInstance = Loading.service(
        loadingConfig(document.getElementById('papers') as HTMLElement)
      );
      const papersRes = await requestPapers({
        authorId: this.authorId,
        page: this.page,
        sortKey: this.sortKey
      });
      this.papers = papersRes.papers;
      loadingInstance.close();
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';

.author-portrait-wrapper {
  overflow-x: hidden;
}
</style>

<style lang="less">
g[class^='p'][class$='arc'] {
  cursor: pointer;
}
</style>
