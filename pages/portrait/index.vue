<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'PortraitIndex',
  // 重定向到基础搜索
  asyncData({ query, redirect }) {
    redirect('/404', query);
  },
  render(h) {
    return h('div');
  }
});
</script>
