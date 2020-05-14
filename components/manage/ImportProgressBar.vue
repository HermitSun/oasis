<template>
  <div>
    <div v-for="(task, index) of tasks" :key="'task' + index">
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
      <p
        v-for="(proceeding, i) of task.proceedings"
        :key="'proceeding' + i"
        style="margin: 5px auto"
      >
        {{ proceeding.proceedingTitle }}
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
