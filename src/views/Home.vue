<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Vue from "vue";

export default Vue.extend({
  name: "Home",
  component: {
    HelloWorld
  }
});
</script>
