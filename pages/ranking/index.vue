<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'RankingIndex',
  // 重定向到基础搜索
  asyncData({ query, redirect }) {
    redirect('/ranking/author', query);
  },
  render(h) {
    return h('div');
  }
});
</script>
