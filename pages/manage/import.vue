<template>
  <div class="manage-import-wrapper">
    <el-progress type="circle" :percentage="100" status="success" />
    <!--导入数据文件-->
    <el-button type="primary" @click="showUploadDialog = true">
      导入数据文件
    </el-button>
    <ImportUploadDialog
      v-if="showUploadDialog"
      @close="showUploadDialog = false"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Progress } from 'element-ui';

export default Vue.extend({
  name: 'DataImport',
  components: {
    ImportUploadDialog: () =>
      import('~/components/manage/ImportUploadDialog.vue'),
    [Progress.name]: Progress
  },
  data() {
    return {
      showUploadDialog: false
    };
  },
  beforeMount() {
    // preconnect
    const cdnPreConnect = document.createElement('link');
    cdnPreConnect.href = 'https://fonts.googleapis.com';
    cdnPreConnect.crossOrigin = 'anonymous';
    // dns-prefetch
    const dnsPrefetch = document.createElement('link');
    dnsPrefetch.href = 'https://fonts.googleapis.com';
    // apply to html
    document.head.appendChild(cdnPreConnect);
    document.head.appendChild(dnsPrefetch);
  },
  mounted() {
    // 导入源代码字体
    const fontElement = document.createElement('link');
    fontElement.rel = 'proload';
    fontElement.href =
      'https://fonts.googleapis.com/css?family=Source+Code+Pro&display=swap';
    fontElement.as = 'style';
    fontElement.crossOrigin = 'anonymous';
    document.head.appendChild(fontElement);
  }
});
</script>
