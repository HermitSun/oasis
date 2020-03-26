<template>
  <div class="manage-import-wrapper">
    <h2 style="text-align: center; margin-bottom: 5px">
      论文数据导入
    </h2>
    <el-upload
      ref="paperUploader"
      action=""
      :limit="1"
      :auto-upload="false"
      :on-remove="removePaper"
      :on-change="handleFileChange"
      :on-exceed="handleFileExceed"
      style="text-align: center"
    >
      <template #trigger>
        <el-button
          :type="!isUploadValid ? 'primary' : 'default'"
          :disabled="isUploadValid"
          class="upload-selector"
        >
          选取本地文件
        </el-button>
      </template>
      <el-button
        :type="isUploadValid ? 'primary' : 'default'"
        style="margin-left: 10px;"
        :disabled="!isUploadValid || isUploading"
        class="upload-uploader"
        @click="doUpload"
      >
        导入选定文件
      </el-button>
      <template #tip>
        <div class="el-upload__tip">
          请上传<b>1个</b>不超过<b>10MB</b>的<b>JSON / CSV</b>文件
          <p>提示：新增的数据会与原有的数据进行<b>合并</b></p>
        </div>
      </template>
    </el-upload>
    <!--示例-->
    <link
      href="https://fonts.googleapis.com/css?family=Source+Code+Pro&display=swap"
      rel="stylesheet"
    />
    <!--示例JSON-->
    <div
      style="text-align: left; min-width: 350px; max-width: 40%; float: left; margin-left: 10%"
    >
      JSON格式：
      <pre style="font-family: 'Source Code Pro', monospace;">
  {
    id: string;
    title: string;
    authors: string[];
    _abstract: string;
    publicationYear: string;
    metrics:{
      citationCountPaper: number;
      citationCountPatent: number;
      totalDownloads: number;
    };
    keywords: string[];
    conferenceName: string;
    link: string;
  }
      </pre>
      查看示例JSON：
      <a href="https://wensun.top:8080/oasis-help/test.json" target="_blank"
        >test.json</a
      >
    </div>
    <!--示例CSV-->
    <div
      style="text-align: left; min-width: 350px; max-width: 40%; float: right; margin-right: 10%"
    >
      CSV格式：
      <pre style="font-family: 'Source Code Pro', monospace;">
  _id
  title
  authors__name
  authors__affiliation
  authors__firstName
  authors__lastName
  authors__id
  abstract
  publicationTitle
  doi
  publicationYear
  metrics___citationCountPaper
  metrics___citationCountPatent
  metrics___totalDownloads
  conferenceName
  link
      </pre>
      查看示例CSV：
      <a href="https://wensun.top:8080/oasis-help/result.csv" target="_blank"
        >result.csv</a
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ElUpload, ElUploadInternalFileDetail } from 'element-ui/types/upload';
import { Upload } from 'element-ui';
import { importPaperData } from '@/api';

export default Vue.extend({
  name: 'DataImport',
  components: {
    [Upload.name]: Upload
  },
  data() {
    return {
      // 因为服务端没有FormData，只在客户端进行渲染
      papers: (undefined as unknown) as FormData,
      isUploadValid: false,
      isUploading: false // 是否正在上传
    };
  },
  mounted() {
    this.papers = new FormData();
  },
  methods: {
    // 移除paper
    removePaper(file: { status: string; raw: File }, fileList: File[]) {
      console.log(file, fileList);
      this.papers.delete('paperData');
      this.isUploadValid = false;
    },
    // 判断文件是否符合标准
    isProperJSONOrCSV(file: File) {
      const isJSON =
        file.type === 'application/json' || file.name.endsWith('.json');
      const isCSV =
        file.type === 'application/vnd.ms-excel' || file.name.endsWith('.csv');
      const isUnderLimit = file.size / 1024 / 1024 <= 10;
      return (isJSON || isCSV) && isUnderLimit;
    },
    // 文件修改时调用，主要是用来上传
    handleFileChange(file: ElUploadInternalFileDetail, fileList: File[]) {
      console.log(file, fileList);
      if (file.status === 'ready') {
        if (this.isProperJSONOrCSV(file.raw)) {
          this.papers.set('paperData', file.raw);
        } else {
          this.$message.error('请按要求上传文件');
          fileList.splice(fileList.length - 1, 1);
        }
      }
      this.isUploadValid = fileList.length !== 0;
    },
    handleFileExceed() {
      this.$message.error('文件数量超过限制');
    },
    // 进行上传
    async doUpload() {
      console.log(this.papers.get('paperData'));
      const paperUploader = this.$refs.paperUploader as ElUpload;
      paperUploader.submit();
      // 正在上传，增加健壮性
      this.isUploading = true;
      try {
        const importRes = await importPaperData(this.papers);
        if (importRes && importRes.code === 200) {
          this.$message.success(
            `成功导入了${importRes.data.increasedCount}条数据`
          );
          // clear
          this.papers = new FormData();
        } else {
          this.$message.error('导入失败');
        }
      } catch (e) {
        this.$message(e.toString());
      } finally {
        this.isUploading = false;
      }
    }
  }
});
</script>
