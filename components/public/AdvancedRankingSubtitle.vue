<template>
  <div>
    <div class="subtitle flex-space-between">
      <span>{{ title }}</span>
      <span class="option">
        <span v-if="subject !== 'keyword'" class="label">
          <span class="hint">Sort By</span>
          <el-select
            v-model="sortKey"
            size="small"
            :value="sortKey"
            style="width: 160px"
            @change="jumpToRanking"
          >
            <el-option
              v-for="item in sortKeys"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </span>
        <span class="label" style="margin-left: 10px">
          <span class="hint">Time Range</span>
          <el-select
            v-model="startYear"
            size="small"
            :value="startYear"
            style="width: 90px"
            @change="jumpToRanking"
          >
            <el-option
              v-for="item in generateArray(2015, endYear)"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
          <span style="margin: 0 3px">~</span>
          <el-select
            v-model="endYear"
            size="small"
            :value="endYear"
            style="width: 90px"
            @change="jumpToRanking"
          >
            <el-option
              v-for="item in generateArray(startYear, 2020)"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </span>
      </span>
    </div>
    <div class="subtitle-divider"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Select, Option } from 'element-ui';
import RankingOption from '../ranking/rankingOpt';
import { sortKey } from '~/interfaces/requests/ranking/RankingPayload';
export default Vue.extend({
  name: 'AdvancedRankingSubtitle',
  components: {
    [Select.name]: Select,
    [Option.name]: Option
  },
  mixins: [RankingOption],
  props: {
    title: {
      type: String,
      default: ''
    },
    subject: {
      type: String,
      default: 'Keyword'
    }
  },
  data() {
    return {
      selectedSubject: this.subject,
      sortKey: 'acceptanceCount' as sortKey,
      startYear: 2015,
      endYear: new Date().getFullYear()
    };
  },
  methods: {
    jumpToRanking() {
      this.$router.push({
        path: '/ranking/' + this.subject,
        query: {
          sortKey: this.sortKey,
          startYear: this.startYear.toString(),
          endYear: this.endYear.toString()
        }
      });
    },
    generateArray(start: number, end: number) {
      return Array.from(new Array(end + 1).keys())
        .slice(start)
        .reverse();
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
