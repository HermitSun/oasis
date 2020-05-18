<template>
  <div class="mask">
    <div class="mask-box absolute-center advanced-search__mask-box-size">
      <!--关闭-->
      <div class="mask-box-header">
        Command Search
        <span>
          <img
            style="cursor: pointer"
            src="~/assets/icon/icon-close.png"
            alt="close"
            @click="closeCommandSearch"
          />
        </span>
      </div>
      <div class="advanced-search__mask-box-divider"></div>
      <!--搜索框-->
      <div class="advanced-search__mask-content mask-box-content">
        <!--搜索-->
        <input v-model="query" />
        Operators need to be in all caps - i.e. AND/OR/NOT. There is a maximum
        of 20 search terms.
        <button
          class="advanced-search__button"
          style="width:50px;float: right"
          @click="sendCommandSearch"
        >
          <img src="~/assets/icon/icon-search.png" width="20" alt="search" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'CommandSearchComp',
  data() {
    return {
      query: this.$route.query.query ? this.$route.query.query : '' // command search query
    };
  },
  methods: {
    sendCommandSearch() {
      const defaultPage = '1';
      this.$emit('close');
      this.$router.push({
        path: '/search/command',
        query: {
          query: this.query, // 泛化关键字
          page: defaultPage,
          // 需要增加sortKey
          sortKey: 'related'
        }
      });
    },
    closeCommandSearch() {
      this.$emit('close');
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
