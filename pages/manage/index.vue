<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ManageIndex',
  // 重定向到论文管理页面
  asyncData({ redirect }) {
    redirect('/manage/papers');
  },
  render(h) {
    return h('div');
  }
});
</script>
