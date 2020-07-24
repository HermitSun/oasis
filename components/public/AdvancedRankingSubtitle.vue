<template>
  <div>
    <div class="subtitle">
      <span style="margin: 0 20px 20px">{{ title }}</span>
      <!--菜单-->
      <div class="flex-space-between">
        <el-menu
          background-color="transparent"
          active-text-color="#6C63FF"
          text-color="#c0c4cc"
          :default-active="currentRoute"
          mode="horizontal"
          router
          style="height: 100%"
        >
          <el-menu-item
            v-for="(item, index) in navItems"
            :key="index"
            :index="item.path"
          >
            <template #title>
              <span>{{ item.title }}</span>
            </template>
          </el-menu-item>
        </el-menu>
        <span class="option">
          <span class="label">
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
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Select, Option, Menu, MenuItem } from 'element-ui';
import RankingOption from '../ranking/rankingOpt';
import { sortKey } from '~/interfaces/requests/ranking/RankingPayload';
export default Vue.extend({
  name: 'AdvancedRankingSubtitle',
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    [Menu.name]: Menu,
    [MenuItem.name]: MenuItem
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
      sortKey: (this.$route.query.sortKey || 'acceptanceCount') as sortKey,
      startYear: Number(this.$route.query.startYear) || 2015,
      endYear: Number(this.$route.query.endYear) || new Date().getFullYear()
    };
  },
  computed: {
    currentRoute(): string {
      const regExpMatchArray = this.$route.path.match(
        /^\/ranking\/(.*)/
      ) as any;
      console.log(
        '/ranking/' + (regExpMatchArray ? regExpMatchArray[1] : 'author')
      );
      return '/ranking/' + (regExpMatchArray ? regExpMatchArray[1] : 'author');
    },
    navItems() {
      const root = '/ranking';
      return [
        {
          path: root + '/author',
          title: 'Author'
        },
        {
          path: root + '/affiliation',
          title: 'Affiliation'
        },
        {
          path: root + '/keyword',
          title: 'Keyword'
        }
      ];
    }
  },
  watch: {
    $route: {
      handler({ query }) {
        // 手动更新路由
        this.sortKey = (query.sortKey || 'acceptanceCount') as sortKey;
        this.startYear = Number(query.startYear) || 2015;
        this.endYear = Number(query.endYear) || new Date().getFullYear();
      }
    }
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
/deep/ .el-menu.el-menu--horizontal {
  border-bottom: 0 !important;
}
</style>
