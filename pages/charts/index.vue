<template>
  <!--  <embed src="~/assets/index.svg" type="image/svg+xml" />-->
  <img v-if="url" :src="url" />
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

export default Vue.extend({
  name: 'Index',
  data() {
    return { url: '' };
  },
  async mounted() {
    const { data } = await axios.get('/chart', {
      responseType: 'blob'
    });
    console.log(data);
    this.url = URL.createObjectURL(data);
  }
});
</script>
