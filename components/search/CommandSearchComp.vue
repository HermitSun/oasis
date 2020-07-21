<template>
  <div class="mask">
    <div class="mask-box absolute-center advanced-search__mask-box-size">
      <!--关闭-->
      <div class="mask-box-header">
        <span class="title">Command Search</span>
        <el-button
          circle
          icon="el-icon-close"
          size="mini"
          type="text"
          @click="closeCommandSearch"
        />
      </div>
      <div class="advanced-search__mask-box-divider"></div>
      <!--搜索框-->
      <div class="advanced-search__mask-content">
        <!--搜索-->
        <textarea v-model="query"> </textarea>
        <div style="margin-top: 20px;line-height: 25px">
          Hint: operators need to be in all caps - i.e. AND/OR/NOT.
        </div>
        <el-button
          type="primary"
          plain
          circle
          size="small"
          icon="el-icon-search"
          style="float: right"
          @click="sendCommandSearch"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Button } from 'element-ui';

export default Vue.extend({
  name: 'CommandSearchComp',
  components: {
    [Button.name]: Button
  },
  data() {
    return {
      query: this.$route.query.query || '' // command search query
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
          // 虽然commandSearch里用不到开始时间和结束时间 但是后续发起basicSearch可能会用到
          page: defaultPage,
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
