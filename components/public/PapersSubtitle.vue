<template>
  <div>
    <div class="subtitle">
      {{ title }}
      <span style="float: right">
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
    [Select.name]: Select,
    [Option.name]: Option
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
