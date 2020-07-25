<template>
  <div>
    <div
      style="display: flex;justify-content: space-between;align-items: center;flex-direction: row;margin: 10px 0 20px 10px;"
    >
      <span>
        <span style="color: #6c63ff;font-size:1.4rem">{{ title }}</span
        ><span style="color: #ccc"> papers</span></span
      >
      <span>
        <span style="color: #ccc;margin-right: 10px">Sort By</span>
        <el-select
          v-model="newSortKey"
          placeholder="sort key"
          size="mini"
          @change="sendNewSortKey"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </span>
    </div>
    <div class="subtitle-divider"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Select, Option } from 'element-ui';
import { sortKey } from '~/interfaces/requests/search/SearchPayload';
import paperSortKeyOptions from '~/components/public/PaperSortKeyOptions';

export default Vue.extend({
  name: 'PapersSubtitle',
  components: {
    [Option.name]: Option,
    [Select.name]: Select
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    sortKey: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      newSortKey: this.sortKey as sortKey,
      options: paperSortKeyOptions
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
@import '../../stylesheets/default.less';
</style>
