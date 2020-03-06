<template>
  <div>
    <h2>论文数据导入</h2>
    <el-upload
      action=""
      :limit="1"
      :auto-upload="false"
      :on-remove="removePaper"
      :on-change="handleFileChange"
      :on-exceed="handleFileExceed"
      ref="paperUploader"
    >
      <template #trigger>
        <el-button
          :type="!isUploadValid ? 'primary' : 'default'"
          :disabled="isUploadValid"
          class="upload-selector"
          >选取本地文件</el-button
        >
      </template>
      <el-button
        @click="doUpload"
        :type="isUploadValid ? 'primary' : 'default'"
        style="margin-left: 10px;"
        :disabled="!isUploadValid"
        class="upload-uploader"
      >
        导入选定文件
      </el-button>
      <template #tip>
        <div class="el-upload__tip">
          请上传<b>1个</b>不超过<b>10MB</b>的<b>JSON / CSV</b>文件
        </div>
      </template>
    </el-upload>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ElUpload, ElUploadInternalFileDetail } from "element-ui/types/upload";
import { importPaperData } from "@/api";
import { StatusCode } from "@/enums/status-code";

export default Vue.extend({
  name: "DataImport",
  data() {
    return {
      papers: new FormData(),
      isUploadValid: false
    };
  },
  methods: {
    // 移除paper
    removePaper(file: { status: string; raw: File }, fileList: File[]) {
      console.log(file, fileList);
      this.papers.delete("paperData");
      this.isUploadValid = false;
    },
    // 判断文件是否符合标准
    isProperJSONOrCSV(file: File) {
      const isJSON =
        file.type === "application/json" || file.name.endsWith(".json");
      const isCSV =
        file.type === "application/vnd.ms-excel" || file.name.endsWith(".csv");
      const isUnderLimit = file.size / 1024 / 1024 <= 10;
      return (isJSON || isCSV) && isUnderLimit;
    },
    // 文件修改时调用，主要是用来上传
    handleFileChange(file: ElUploadInternalFileDetail, fileList: File[]) {
      console.log(file, fileList);
      if (file.status === "ready") {
        if (this.isProperJSONOrCSV(file.raw)) {
          this.papers.set("paperData", file.raw);
        } else {
          this.$message.error("请按要求上传文件");
          fileList.splice(fileList.length - 1, 1);
        }
      }
      this.isUploadValid = fileList.length !== 0;
    },
    handleFileExceed() {
      this.$message.error("文件数量超过限制");
    },
    // 进行上传
    async doUpload() {
      console.log(this.papers.get("paperData"));
      const paperUploader = this.$refs["paperUploader"] as ElUpload;
      paperUploader.submit();
      const importRes = await importPaperData(this.papers);
      if (importRes && importRes.code === StatusCode.OK) {
        this.$message.success(
          `成功导入了${importRes.data.increasedCount}条数据`
        );
        // clear
        this.papers = new FormData();
      } else {
        this.$message.error("导入失败");
      }
    }
  }
});
</script>

<style scoped></style>
