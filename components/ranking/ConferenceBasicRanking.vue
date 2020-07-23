<template>
  <div class="ranking-basic">
    <div class="title">
      Top Conference
      <span class="flex-center-row">
        <span class="label">
          <span class="hint">Year</span>
          <el-select
            v-model="year"
            size="small"
            :value="year"
            style="width:90px"
            @change="requestConferenceBasicRanking"
          >
            <el-option
              v-for="item in timeRange"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </span>
        <span class="label" style="margin-left: 10px">
          <span class="hint">Sort By</span>
          <el-select
            v-model="sortKey"
            size="small"
            :value="sortKey"
            style="width: 160px"
            @change="requestConferenceBasicRanking"
          >
            <el-option
              v-for="item in sortKeys"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </span>
      </span>
    </div>
    <!--无数据时的提示-->
    <div
      v-if="conferenceBasicRankingResponse.length === 0"
      :style="noDataPromptStyle"
    >
      暂无数据...
    </div>
    <!--排名内容-->
    <div
      v-for="(rank, index) in conferenceBasicRankingResponse"
      :key="index"
      class="info"
    >
      <div class="name-wrapper">
        <span class="icon">{{ requestRankingIcon(index) }}</span>
        <span class="name" @click="jumpToPortrait(rank.name)">{{
          rank.name
        }}</span>
      </div>
      <div class="count">
        {{ rank.count }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Select, Option } from 'element-ui';
import { getRankingIcon } from '~/components/ranking/ranking';
import { getConferenceBasicRanking } from '~/api';
import { sortKey } from '~/interfaces/requests/ranking/RankingPayload';
import NoDataPrompt from '~/components/mixins/NoDataPrompt';
import RankingTimeRange from '~/components/ranking/rankingOpt';

export default Vue.extend({
  name: 'ConferenceBasicRanking',
  components: {
    [Select.name]: Select,
    [Option.name]: Option
  },
  mixins: [NoDataPrompt, RankingTimeRange],
  props: {
    ranking: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      sortKey: 'acceptanceCount' as sortKey,
      year: new Date().getFullYear(),
      conferenceBasicRankingResponse: this.ranking
    };
  },
  methods: {
    async requestConferenceBasicRanking() {
      try {
        const conferenceBasicRankingRes = await getConferenceBasicRanking({
          sortKey: this.sortKey,
          year: this.year
        });
        this.conferenceBasicRankingResponse = conferenceBasicRankingRes.data;
      } catch (e) {
        this.$message(e.toString());
      }
    },
    requestRankingIcon(rank: number): string {
      return getRankingIcon(rank);
    },
    jumpToPortrait(conference: string) {
      this.$router.push({
        path: '/portrait/conference',
        query: { conference }
      });
    },
    changeSortKey() {
      this.sortKey =
        this.sortKey === 'citationCount' ? 'acceptanceCount' : 'citationCount';
      this.requestConferenceBasicRanking();
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
