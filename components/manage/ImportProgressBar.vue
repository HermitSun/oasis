<template>
  <div>
    <div v-for="(task, index) of tasks" :key="'task' + index">
      <!--进度条-->
      <el-progress
        v-if="task.isFinished"
        :text-inside="true"
        :stroke-width="25"
        :percentage="task.percentage"
        status="success"
      />
      <el-progress
        v-else
        :text-inside="true"
        :stroke-width="25"
        :percentage="task.percentage"
      />
      <!--正在爬取的论文集-->
      <p
        v-for="(proceeding, i) of task.proceedings"
        :key="'proceeding' + i"
        style="margin: 5px auto"
      >
        {{ i + 1 }}. {{ proceeding.proceedingTitle }}
      </p>
      <!--进度-->
      <p style="float: right">
        <span>已导入：{{ task.paperCount }}，</span>
        <span>总论文数：{{ task.totalPaperNum }} </span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Progress } from 'element-ui';

export default Vue.extend({
  name: 'ImportProgressBar',
  components: {
    [Progress.name]: Progress
  },
  props: {
    tasks: {
      /**
       * type CrawlTaskInfo = Array<CrawlTaskResponse & { percentage: number }>;
       */
      type: Array,
      required: true
    }
  }
});
</script>
