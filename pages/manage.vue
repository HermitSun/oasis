<template>
  <el-container style="height: 100%">
    <!--标题-->
    <el-header>
      <h1 style="text-align: center">
        <img src="~/assets/logo.png" style="width: 20vw" /> DBMS
      </h1>
    </el-header>
    <el-container>
      <!--导航-->
      <el-aside width="300px">
        <el-menu :default-active="currentRoute" router style="height: 100%">
          <el-menu-item
            v-for="(item, index) in navItems"
            :key="index"
            :index="item.path"
            :disabled="item.disabled"
          >
            <i :class="item.icon"></i>
            <template #title>
              <span>{{ item.title }}</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!--内容-->
      <el-main>
        <nuxt-child />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Aside,
  Container,
  Footer,
  Header,
  Main,
  Menu,
  MenuItem
} from 'element-ui';

export default Vue.extend({
  name: 'Manage',
  components: {
    [Aside.name]: Aside,
    [Container.name]: Container,
    [Footer.name]: Footer,
    [Header.name]: Header,
    [Main.name]: Main,
    [Menu.name]: Menu,
    [MenuItem.name]: MenuItem
  },
  computed: {
    // 当前导航
    currentRoute() {
      return this.$route.path;
    },
    // 所有的导航项，暂时硬编码了
    navItems() {
      return [
        {
          path: '/manage/import',
          title: '论文数据导入',
          icon: 'el-icon-upload2'
        },
        {
          path: '/manage/papers',
          title: '论文数据管理',
          icon: 'el-icon-document'
        },
        {
          path: '/manage/authors',
          title: '学者数据管理',
          icon: 'el-icon-user'
        },
        {
          path: '/manage/affiliations',
          title: '机构数据管理',
          icon: 'el-icon-school'
        },
        {
          path: '/manage/conferences',
          title: '会议数据管理',
          icon: 'el-icon-suitcase'
        },
        {
          path: '/manage/journals',
          title: '期刊数据管理',
          icon: 'el-icon-reading'
        }
      ];
    }
  }
});
</script>
