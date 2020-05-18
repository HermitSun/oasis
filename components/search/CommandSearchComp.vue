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
  methods: {
    sendCommandSearch() {
      // const defaultPage = '1';
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
