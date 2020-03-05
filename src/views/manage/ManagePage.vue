<template>
  <el-container style="height: 100%">
    <!--标题-->
    <el-header>
      <h1>OASIS DBMS</h1>
    </el-header>
    <el-container>
      <!--导航-->
      <el-aside :width="navWidth">
        <el-menu :default-active="currentRoute" router style="height: 100%">
          <el-menu-item
            v-for="(item, index) in navItems"
            :index="item.children ? item.children[0].path : item.path"
            :key="index"
            :disabled="item.meta.disabled"
          >
            <i :class="item.meta.icon"></i>
            <template #title>
              <span>{{ item.name }}</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!--内容-->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Vue from "vue";
import manage from "@/router/manage";
import { getClientWidth } from "@/utils/breakpoint";

export default Vue.extend({
  name: "ManagePage",
  computed: {
    // 导航宽度，1/6的屏幕
    // 需要注意的是，这里的属性是非响应的，并不会变化
    navWidth() {
      return getClientWidth() / 6 + "px";
    },
    // 当前导航
    currentRoute() {
      return this.$route.path;
    },
    // 所有的导航项
    navItems() {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return manage.find(route => route.path === "/manage")!.children;
    }
  }
});
</script>

<style scoped></style>
