<template>
  <el-container>
    <el-header class="searchPage-header">
      <template>
        <!--LOGO-->
        <img
          src="~/assets/logo.png"
          class="searchPage-header__logo"
          alt="oasis"
          style="cursor: pointer"
          @click="$router.push('/')"
        />
        <!--菜单-->
        <el-menu
          background-color="transparent"
          active-text-color="#fff"
          text-color="#000"
          :default-active="currentRoute"
          mode="horizontal"
          router
          style="height: 100%"
        >
          <el-menu-item
            v-for="(item, index) in navItems"
            :key="index"
            :index="item.path"
          >
            <i :class="item.icon"></i>
            <template #title>
              <span>{{ item.title }}</span>
            </template>
          </el-menu-item>
        </el-menu>
        <!--普通搜索-->
        <input
          v-model="searchContent"
          class="basic-search__input"
          type="text"
          aria-label="search input"
          @keyup.enter="startAnotherBasicSearch(searchContent)"
        />
        <!--高级搜索-->
        <button
          class="mobile-hidden advanced-search__button"
          style="margin-left: 20px"
          @click="showAdvancedSearch = true"
        >
          Advanced Search
        </button>
        <!-- 命令搜索-->
        <button
          class="mobile-hidden basic-search__button"
          style="margin-left: 20px"
          @click="showCommandSearch = true"
        >
          Command Search
        </button>
      </template>
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
    </el-header>
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
import AdvancedSearchComp from '~/components/search/AdvancedSearchComp.vue';
import CommandSearchComp from '~/components/search/CommandSearchComp.vue';

export default Vue.extend({
  name: 'SearchBar',
  components: {
    AdvancedSearchComp,
    CommandSearchComp,
    [Aside.name]: Aside,
    [Container.name]: Container,
    [Footer.name]: Footer,
    [Header.name]: Header,
    [Main.name]: Main,
    [Menu.name]: Menu,
    [MenuItem.name]: MenuItem
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
      showCommandSearch: false
    };
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
          path: '/',
          title: 'Search'
        },
        {
          path: '/ranking',
          title: 'Ranking'
        },
        {
          path: '/talent',
          title: 'Talents'
        }
      ];
    }
  },
  watch: {
    keyword(val: string) {
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
