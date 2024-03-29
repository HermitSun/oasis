<template>
  <div>
    <div class="searchPage-header">
      <div class="flex-left-center-row">
        <!--LOGO-->
        <img
          src="~/assets/logo.png"
          style="cursor: pointer; margin-right: 20px;margin-left:10px"
          class="searchPage-header__logo"
          alt="oasis"
          @click="$router.push('/')"
        />
        <!--菜单__pc版-->
        <el-menu
          background-color="transparent"
          active-text-color="#6C63FF"
          text-color="#000"
          :default-active="currentRoute"
          mode="horizontal"
          router
          style="height: 100%; margin-left: 20px; min-width: 280px"
          class="pad-hidden"
        >
          <el-menu-item
            v-for="(item, index) in navItems"
            :key="index"
            :index="item.path"
          >
            <template #title>
              <span>{{ item.title }}</span>
            </template>
          </el-menu-item>
        </el-menu>
        <!--菜单__pad版本-->
        <div class="pc-hidden_pad">
          <el-button
            icon="el-icon-menu"
            size="mini"
            type="primary"
            plain
            circle
            @click="drawer = true"
          />
        </div>
      </div>
      <!--首页不显示额外的搜索框-->
      <div v-if="$route.path !== '/'">
        <div>
          <!--普通搜索-->
          <input
            v-model="searchContent"
            class="basic-search__input"
            style="margin-left: 10px;height: 40px"
            type="text"
            aria-label="search input"
            @keyup.enter="startAnotherBasicSearch(searchContent)"
          />
          <!--高级搜索-->
          <el-button
            class="pad-hidden"
            type="primary"
            plain
            round
            size="small"
            style="margin-left: 10px"
            @click="showAdvancedSearch = true"
          >
            Advanced Search
          </el-button>
          <!-- 命令搜索-->
          <el-button
            class="pad-hidden"
            type="primary"
            round
            size="small"
            @click="showCommandSearch = true"
          >
            Command Search
          </el-button>
        </div>
      </div>
    </div>
    <template>
      <AdvancedSearchComp
        v-if="showAdvancedSearch"
        @close="showAdvancedSearch = false"
      />
      <CommandSearchComp
        v-if="showCommandSearch"
        @close="showCommandSearch = false"
      />
    </template>
    <el-drawer :visible.sync="drawer" size="60%" direction="rtl">
      <span slot="title" class="card-title">OASIS</span>
      <div style="padding: 0 20px">
        <div style="border-top:1px solid #dcdfe6;width: 100%"></div>
        <div v-for="(item, index) in navItems" :key="index">
          <div
            style="
             border-bottom: 1px solid #dcdfe6;
             padding: 15px 0;
             font-size: 1rem;"
          >
            <router-link
              :to="item.path"
              style="text-decoration: none;
              color:#606266
"
            >
              <i
                :class="item.icon"
                style="color: #6c63ff;margin-right: 10px"
              ></i>
              {{ item.title }}
            </router-link>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Container, Menu, MenuItem, Drawer } from 'element-ui';
import AdvancedSearchComp from '~/components/search/AdvancedSearchComp.vue';
import CommandSearchComp from '~/components/search/CommandSearchComp.vue';

export default Vue.extend({
  name: 'SearchBar',
  components: {
    AdvancedSearchComp,
    CommandSearchComp,
    [Container.name]: Container,
    [Menu.name]: Menu,
    [MenuItem.name]: MenuItem,
    [Drawer.name]: Drawer
  },
  model: {
    prop: 'keyword',
    event: 'changed'
  },
  props: {
    keyword: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      searchContent: this.keyword,
      showAdvancedSearch: false,
      showCommandSearch: false,
      opacityStyle: {
        background: 'rgba(255,255,255,0)'
      },
      drawer: false,
      // 所有的导航项，暂时硬编码了
      navItems: [
        {
          path: '/',
          title: 'Home',
          icon: 'el-icon-s-home'
        },
        {
          path: '/ranking',
          title: 'Ranking',
          icon: 'el-icon-data-analysis'
        },
        {
          path: '/talent',
          title: 'Talents',
          icon: 'el-icon-user'
        }
      ]
    };
  },
  computed: {
    // 当前导航
    // 排名页的子页面也激活排名的导航项
    currentRoute(): string {
      const isInRankingPage = /ranking\/.*/.test(this.$route.path);
      return isInRankingPage ? '/ranking' : this.$route.path;
    }
  },
  watch: {
    keyword(val: string): void {
      this.searchContent = val;
    }
  },
  methods: {
    // 开始另一次搜索（关键字不同）回车时默认为普通搜索
    startAnotherBasicSearch(keyword: string) {
      this.$emit('keyword-change', keyword);
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
