<template>
  <div class="manage-import-wrapper">
    <el-timeline>
      <!--选择会议或期刊-->
      <el-timeline-item
        v-if="step >= 1"
        timestamp="选择会议或期刊"
        placement="top"
        :type="step === 1 ? 'primary' : 'success'"
      >
        <el-select
          v-model="selectedTitleId"
          filterable
          remote
          :remote-method="getConferencesAndJournalsList"
          placeholder="请输入会议或期刊名"
          style="display:block; width: 100%"
        >
          <el-option
            v-for="conferenceOrJournal of conferencesAndJournalsList"
            :key="conferenceOrJournal.titleId"
            :label="conferenceOrJournal.publicationTitle"
            :value="conferenceOrJournal.titleId"
          />
        </el-select>
      </el-timeline-item>
      <!--选择具体的年份-->
      <el-timeline-item
        v-if="step >= 2"
        timestamp="选择年份"
        placement="top"
        :type="step === 2 ? 'primary' : 'success'"
      >
        <el-select
          v-model="selectedProceedingIds"
          multiple
          filterable
          placeholder="请输入年份"
          style="display:block; width: 100%"
        >
          <el-option
            v-for="proceeding of proceedings"
            :key="proceeding.proceedingId"
            :label="proceeding.proceedingTitle"
            :value="proceeding.proceedingId"
          />
        </el-select>
      </el-timeline-item>
      <!--确认开始-->
      <el-timeline-item
        v-if="step >= 3"
        timestamp="确认开始"
        placement="top"
        :type="step === 3 ? 'primary' : 'success'"
      >
        <el-button
          type="primary"
          size="medium"
          round
          style="display: block; margin: 0 auto"
          @click="execCrawlTask"
        >
          确认开始
        </el-button>
      </el-timeline-item>
      <!--正在运行的导入任务-->
      <el-timeline-item timestamp="已有任务" placement="top" type="primary">
        <ImportProgressBar :tasks="runningTasks" />
      </el-timeline-item>
    </el-timeline>
    <!--导入数据文件-->
    <el-divider>旧版功能</el-divider>
    <el-button
      type="primary"
      size="medium"
      round
      style="display: block; margin: 0 auto"
      @click="showUploadDialog = true"
    >
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
import {
  Divider,
  Option,
  Progress,
  Select,
  Timeline,
  TimelineItem
} from 'element-ui';
import {
  execCrawlTask,
  getConferencesAndJournalsList,
  getConferencesAndJournalsProceedings,
  getCrawlTask
} from '~/api/manage';
import {
  ConferencesAndJournalsInfo,
  ConferencesAndJournalsProceedingsInfoResponse,
  CrawlTaskResponse
} from '~/interfaces/responses/manage/PaperImportResponse';
import ImportProgressBar from '~/components/manage/ImportProgressBar.vue';
import importBus from '~/components/manage/bus';

// 爬虫任务需要的信息
type CrawlTaskInfo = Array<CrawlTaskResponse & { percentage: number }>;
// 轮询任务
let pollingTask: NodeJS.Timeout;

export default Vue.extend({
  name: 'DataImport',
  components: {
    [Divider.name]: Divider,
    ImportProgressBar,
    ImportUploadDialog: () =>
      import('~/components/manage/ImportUploadDialog.vue'),
    [Option.name]: Option,
    [Progress.name]: Progress,
    [Select.name]: Select,
    [Timeline.name]: Timeline,
    [TimelineItem.name]: TimelineItem
  },
  data() {
    return {
      // 导入数据
      selectedTitleId: '',
      conferencesAndJournalsList: [] as ConferencesAndJournalsInfo[],
      selectedProceedingIds: [] as string[],
      proceedings: [] as ConferencesAndJournalsProceedingsInfoResponse[],
      // 正在运行的爬虫任务
      runningTasks: [] as CrawlTaskResponse[],
      // 老版本的导入数据文件
      showUploadDialog: false
    };
  },
  computed: {
    step(): number {
      if (this.selectedTitleId) {
        if (this.selectedProceedingIds.length > 0) {
          return 3;
        } else {
          return 2;
        }
      } else {
        return 1;
      }
    }
  },
  watch: {
    selectedTitleId(titleId: string) {
      if (titleId) {
        this.getConferencesAndJournalsProceedings(titleId);
      }
    }
  },
  mounted() {
    // 每秒更新一次结果
    pollingTask = setInterval(() => {
      this.getCrawlTasks();
    }, 1000);
    // 提前加载字体
    this.preloadSrcCodeFont();
  },
  beforeDestroy() {
    clearInterval(pollingTask);
  },
  methods: {
    // **提前**导入源代码字体
    preloadSrcCodeFont() {
      const fontElement = document.createElement('link');
      fontElement.rel = 'stylesheet proload';
      fontElement.href =
        'https://fonts.googleapis.com/css?family=Source+Code+Pro&display=swap';
      fontElement.as = 'style';
      fontElement.crossOrigin = 'anonymous';
      document.head.appendChild(fontElement);
    },
    // 获取会议和期刊列表
    async getConferencesAndJournalsList(keyword: string) {
      if (keyword) {
        const listRes = await getConferencesAndJournalsList(keyword);
        this.conferencesAndJournalsList = listRes.data.list;
      } else {
        this.conferencesAndJournalsList = [];
      }
    },
    // 获取已选择年份对应的论文
    async getConferencesAndJournalsProceedings(titleId: string) {
      const proceedingRes = await getConferencesAndJournalsProceedings(titleId);
      this.proceedings = proceedingRes.data;
    },
    // 运行爬虫任务
    async execCrawlTask() {
      try {
        await this.$confirm('是否导入选中的论文集?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        const execRes = await execCrawlTask(this.selectedProceedingIds);
        console.log(execRes);
        // clear
        this.selectedTitleId = '';
        this.selectedProceedingIds = [];
      } catch (e) {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      }
    },
    // 获取正在运行的任务
    async getCrawlTasks() {
      // 没有正在运行的请求时再发起请求
      if (importBus.crawlTaskReqNum === 0) {
        try {
          const tasksRes = await getCrawlTask();
          const tasks = tasksRes && tasksRes.data ? tasksRes.data : [];
          this.runningTasks = tasks.map((task) => {
            const currentPercentage = task.isFinished
              ? 100
              : Number(
                  ((task.paperCount / task.totalPaperNum) * 100).toFixed(2)
                );
            return {
              ...task,
              percentage: currentPercentage
            };
          });
        } catch (e) {
          console.log(e.toString());
        }
      }
    }
  }
});
</script>

<style scoped lang="less">
.manage-import-wrapper {
  margin-top: 6vh;
}
</style>
