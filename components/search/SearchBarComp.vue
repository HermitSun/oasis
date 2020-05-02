<template>
  <div class="searchPage-header">
    <!--LOGO-->
    <img
      src="~/assets/logo.png"
      class="searchPage-header__logo"
      alt="oasis"
      style="cursor: pointer"
      @click="$router.push('/')"
    />
    <!--普通搜索-->
    <input
      v-model="searchContent"
      class="basic-search__input"
      type="text"
      aria-label="search input"
      @keyup.enter="startAnotherBasicSearch(searchContent)"
    />
    <!--高级搜索-->
    <button
      class="mobile-hidden advanced-search__button"
      style="margin-left: 20px"
      @click="showAdvancedSearch = true"
    >
      Advanced Search
    </button>
    <AdvancedSearchComp
      v-if="showAdvancedSearch"
      @close="showAdvancedSearch = false"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AdvancedSearchComp from '~/components/search/AdvancedSearchComp.vue';
import { sortKey } from '~/interfaces/requests/search/SearchPayload';

const defaultSortKey = 'related';

export default Vue.extend({
  name: 'SearchBar',
  components: {
    AdvancedSearchComp
  },
  model: {
    prop: 'keyword',
    event: 'changed'
  },
  props: {
    keyword: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      searchContent: this.keyword,
      showAdvancedSearch: false
    };
  },
  watch: {
    keyword(val: string) {
      this.searchContent = val;
    }
  },
  methods: {
    // 开始另一次搜索（关键字不同）回车时默认为普通搜索
    startAnotherBasicSearch(keyword: string) {
      this.$router.push({
        path: '/search',
        query: {
          mode: 'basic',
          keyword,
          page: '1',
          startYear: '1963', // 开始日期
          endYear: '2020', // 结束日期
          sortKey: defaultSortKey as sortKey
        }
      });
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
