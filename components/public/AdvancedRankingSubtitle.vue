<template>
  <div>
    <div class="subtitle">
      {{ title }}
      <span style="float: right">
        <span v-for="(item, index) in subjects" :key="index">
          <!--忽略大小写进行比较-->
          <span
            :class="
              item.toLowerCase() === subject.toLowerCase()
                ? 'selected_subject'
                : 'not_selected_subject'
            "
            class="subject"
            @click="jumpToRanking(item)"
            >{{ item }}</span
          >
          <span v-if="index !== subjects.length - 1">|</span>
        </span>
      </span>
    </div>
    <div class="subtitle-divider"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AdvancedRankingSubtitle',
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
      subjects: ['Author', 'Affiliation', 'Keyword']
    };
  },
  methods: {
    jumpToRanking(subject: string) {
      this.$router.push({ path: '/ranking/' + subject.toLowerCase() });
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
.subject {
  color: @background-blue;
  cursor: pointer;
}
.selected_subject {
  color: @bright-yellow;
}
.not_selected_subject:hover {
  color: @background-blue-normal;
}
</style>
