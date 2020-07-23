<template>
  <el-container>
    <div class="searchPage-header">
      <div class="flex-left-center-row">
        <!--LOGO-->
        <img
          src="~/assets/logo.png"
          style="cursor: pointer;margin-right: 35px;"
          class="searchPage-header__logo"
          alt="oasis"
          @click="$router.push('/')"
        />
        <!--菜单-->
        <el-menu
          background-color="transparent"
          active-text-color="#6C63FF"
          text-color="#000"
          :default-active="currentRoute"
          mode="horizontal"
          router
          style="height: 100%; margin-left: 20px"
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
      </div>
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
            class="mobile-hidden"
            type="primary"
            plain
            round
            size="small"
            style="margin-left: 20px"
            @click="showAdvancedSearch = true"
          >
            Advanced Search
          </el-button>
          <!-- 命令搜索-->
          <el-button
            class="mobile-hidden"
            type="primary"
            round
            size="small"
            style="margin-left: 20px"
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
  MenuItem,
  Button
} from 'element-ui';
import AdvancedSearchComp from '~/components/search/AdvancedSearchComp.vue';
import CommandSearchComp from '~/components/search/CommandSearchComp.vue';

export default Vue.extend({
  name: 'SearchBar',
  components: {
    AdvancedSearchComp,
    CommandSearchComp,
    [Aside.name]: Aside,
    [Button.name]: Button,
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
      showCommandSearch: false,
      opacityStyle: {
        background: 'rgba(255,255,255,0)'
      }
    } as any;
  },
  computed: {
    // 当前导航
    currentRoute(): string {
      return this.$route.path;
    },
    // 所有的导航项，暂时硬编码了
    navItems() {
      return [
        {
          path: '/',
          title: 'Home'
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
    keyword(val: string): void {
      this.searchContent = val;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true);
  },

  destroyed() {
    // 离开该页面需要移除这个监听的事件，不然会报错
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    // 开始另一次搜索（关键字不同）回车时默认为普通搜索
    startAnotherBasicSearch(keyword: string) {
      this.$emit('keyword-change', keyword);
    },
    handleScroll(): void {
      const top = document.documentElement.scrollTop;
      if (top > 45 && top <= 150) {
        const opacity = top / 150;
        this.opacityStyle = {
          background: 'rgba(255,255,255,' + opacity + ')'
        };
      }
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
