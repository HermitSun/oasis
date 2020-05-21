<template>
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
      <p style="text-align: center; margin-bottom: 10px">
        提示：只会导入符合格式的论文，可能会小于论文总数
      </p>
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
  </el-timeline>
</template>

<script lang="ts">
import Vue from 'vue';
import { Option, Select, Timeline, TimelineItem } from 'element-ui';
import {
  execCrawlTask,
  getConferencesAndJournalsList,
  getConferencesAndJournalsProceedings
} from '~/api/manage';
import {
  ConferencesAndJournalsInfo,
  ConferencesAndJournalsProceedingsInfoResponse
} from '~/interfaces/responses/manage/PaperImportResponse';

export default Vue.extend({
  name: 'ImportSelectionDialog',
  components: {
    [Option.name]: Option,
    [Select.name]: Select,
    [Timeline.name]: Timeline,
    [TimelineItem.name]: TimelineItem
  },
  data() {
    return {
      selectedTitleId: '',
      conferencesAndJournalsList: [] as ConferencesAndJournalsInfo[],
      selectedProceedingIds: [] as string[],
      proceedings: [] as ConferencesAndJournalsProceedingsInfoResponse[]
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
  methods: {
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
        if (execRes) {
          this.$message.success('任务已启动');
        }
        // clear
        this.selectedTitleId = '';
        this.selectedProceedingIds = [];
      } catch (e) {
        this.$message.info('任务已取消');
      } finally {
        this.$emit('close');
      }
    }
  }
});
</script>

<style scoped></style>
