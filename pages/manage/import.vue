<template>
  <div class="manage-import-wrapper">
    <el-divider>已有任务</el-divider>
    <div class="manage-import-body">
      <!--筛选标准-->
      <el-date-picker
        v-model="selectedDate"
        type="date"
        placeholder="选择日期"
        value-format="yyyy-MM-dd"
        @change="setDate"
      />
      <el-select
        v-model="selectedTasksFilterKey"
        placeholder="请选择筛选标准"
        style="margin-bottom: 5px"
        @change="setFilterKey"
      >
        <el-option
          v-for="sortKey in tasksFilterKeys"
          :key="sortKey.value"
          :label="sortKey.label"
          :value="sortKey.value"
        />
      </el-select>
      <!--进度条-->
      <ImportProgressBar
        v-if="runningTasks.length > 0"
        :tasks="runningTasks"
        class="progress-bar"
      />
      <!--无数据的提示-->
      <div v-else class="no-data-hint">
        <p style="margin-bottom: 20px; color: #909399">
          暂时还没有任务
        </p>
        <!--只有当天才会显示创建任务-->
        <el-button
          v-if="selectedDate === getFormattedNow()"
          type="primary"
          size="medium"
          @click="showImportSelectionDialog = true"
        >
          + 创建第一个任务
        </el-button>
      </div>
      <!--只有当天才会显示创建任务-->
      <el-button
        v-if="runningTasks.length > 0 && selectedDate === getFormattedNow()"
        type="primary"
        size="medium"
        @click="showImportSelectionDialog = true"
      >
        + 创建新任务
      </el-button>
    </div>
    <!--选择需要导入的论文-->
    <el-drawer
      title="导入论文"
      direction="ltr"
      size="50%"
      :visible.sync="showImportSelectionDialog"
      :before-close="closeImportSelectionDialog"
    >
      <ImportSelectionDialog
        style="margin-right: 15px"
        @close="showImportSelectionDialog = false"
      />
    </el-drawer>
    <!--旧版功能-->
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
  DatePicker,
  Divider,
  Drawer,
  Option,
  Progress,
  Select
} from 'element-ui';
import { getCrawlTask } from '~/api/manage';
import { CrawlTaskResponse } from '~/interfaces/responses/manage/PaperImportResponse';
import ImportProgressBar from '~/components/manage/ImportProgressBar.vue';
import importBus from '~/components/manage/bus';
import { FilterKey } from '~/interfaces/pages/manage/ManageImportPageComp';
import { ElOption } from '~/interfaces/ElOptions';
import { getFormattedDate } from '~/utils/date';

// 爬虫任务需要的信息
type CrawlTaskInfo = Array<CrawlTaskResponse & { percentage: number }>;
// 轮询任务
let pollingTask: NodeJS.Timeout;

export default Vue.extend({
  name: 'DataImport',
  components: {
    [DatePicker.name]: DatePicker,
    [Divider.name]: Divider,
    [Drawer.name]: Drawer,
    [Option.name]: Option,
    [Progress.name]: Progress,
    [Select.name]: Select,
    ImportProgressBar,
    ImportSelectionDialog: () =>
      import('~/components/manage/ImportSelectionDialog.vue'),
    ImportUploadDialog: () =>
      import('~/components/manage/ImportUploadDialog.vue')
  },
  data() {
    return {
      showImportSelectionDialog: false,
      // 正在运行的爬虫任务
      tasksFilterKeys: [
        {
          label: '最近',
          value: 'recent'
        },
        {
          label: '已完成',
          value: 'finished'
        },
        {
          label: '进行中',
          value: 'processing'
        }
      ] as ElOption<FilterKey>[],
      // 从路由读取筛选标准
      selectedTasksFilterKey:
        (this.$route.query.filter as FilterKey) || ('recent' as FilterKey),
      selectedDate:
        (this.$route.query.date as string) || getFormattedDate(new Date()),
      runningTasks: [] as CrawlTaskResponse[],
      // 老版本的导入数据文件
      showUploadDialog: false
    };
  },
  // 查询条件变化时立即发起查询
  // 因为有PV操作，所以不会出问题
  watch: {
    '$route.query'() {
      this.getCrawlTasks();
    }
  },
  mounted() {
    // 每秒更新一次结果
    // 如果有可能，可以换成socket
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
    // 获取正在运行的任务
    async getCrawlTasks() {
      // 没有正在运行的请求时再发起请求
      if (importBus.crawlTaskReqNum === 0) {
        try {
          // 如果没有指定date，默认为今天
          const queryDate = this.selectedDate || this.getFormattedNow();
          const tasksRes = await getCrawlTask(
            this.selectedTasksFilterKey,
            queryDate
          );
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
    },
    // 通过URL持久化
    setFilterKey(key: FilterKey) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          filter: key
        }
      });
    },
    setDate(date: string) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          date
        }
      });
    },
    // 辅助函数
    getFormattedNow() {
      return getFormattedDate(new Date());
    },
    closeImportSelectionDialog() {
      this.showImportSelectionDialog = false;
    }
  }
});
</script>

<style scoped lang="less">
.manage-import-wrapper {
  margin-top: 6vh;

  .manage-import-body {
    min-height: 375px;
    text-align: center;
  }

  .progress-bar {
    min-height: 350px;
    text-align: left;
    margin-top: 5px;
  }

  .no-data-hint {
    min-height: 375px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
