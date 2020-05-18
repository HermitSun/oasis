<template>
  <div class="flex-space-between">
    <span style="margin-right: 10px" class="searchPage-content__sub-hint"
      >Papers</span
    >
    <span style="float: right" class="searchPage-content__sub-hint">
      Sort By
      <el-select v-model="sortKey" size="mini" @change="changeSortKey">
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
    [Select.name]: Select,
    [Option.name]: Option
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
    changeSortKey() {
      this.$emit('changeSortKey', this.newSortKey);
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
