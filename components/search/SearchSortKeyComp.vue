<template>
  <div class="flex-space-between" style="margin-bottom: 6px">
    <span
      style="margin-right: 10px"
      class="searchPage-content__sub-hint mobile-hidden"
      >Papers</span
    >
    <span style="float: right" class="searchPage-content__sub-hint">
      Sort By
      <el-select v-model="newSortKey" size="mini" @change="sendNewSortKey">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Select, Option } from 'element-ui';
import { sortKey } from '~/interfaces/requests/search/SearchPayload';

import searchSortKeyOptions from '~/components/search/SearchSortKeyOptions';
export default Vue.extend({
  name: 'SearchSortKeyComp',
  components: {
    [Option.name]: Option,
    [Select.name]: Select
  },
  props: {
    sortKey: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      options: searchSortKeyOptions,
      newSortKey: this.sortKey as sortKey
    };
  },
  methods: {
    sendNewSortKey() {
      this.$emit('changeSortKey', this.newSortKey);
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
