<template>
  <div class="manage-papers-wrapper">
    <!--论文基本信息-->
    <el-table ref="papersTable" :data="papers" style="width: 100%">
      <template #empty>
        <span class="el-table__empty-text">检索论文以进行管理↗</span>
      </template>
      <!--过长的字段展开时显示-->
      <el-table-column type="expand">
        <template #default="paperProps">
          <el-form inline>
            <!--作者-->
            <el-form-item>
              <template #label>
                <b>作者</b>
              </template>
              <ul style="display: inline;">
                <li
                  v-for="(author, index) of paperProps.row.authors"
                  :key="index"
                >
                  {{ author }}
                </li>
              </ul>
            </el-form-item>
            <!--摘要-->
            <el-form-item>
              <template #label>
                <b>摘要</b>
              </template>
              <span>{{ paperProps.row._abstract }}</span>
            </el-form-item>
            <!--关键词-->
            <el-form-item>
              <template #label>
                <b>关键词</b>
              </template>
              <ul style="display: inline;">
                <li
                  v-for="(keyword, index) of paperProps.row.keywords"
                  :key="index"
                >
                  {{ keyword }}
                </li>
              </ul>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!--简略信息-->
      <el-table-column prop="title" label="标题" width="250" />
      <el-table-column label="作者" width="180">
        <template #default="paperProps">
          <span>{{ paperProps.row.authors[0] }}等</span>
        </template>
      </el-table-column>
      <el-table-column prop="publicationYear" label="出版年份" />
      <el-table-column prop="contentType" label="类型">
        <template #default="paperProps">
          <span>{{ getPaperContentType(paperProps.row.contentType) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="publicationName" label="发表位置" />
      <!--搜索框和操作-->
      <el-table-column align="right" width="200">
        <template #header>
          <el-input
            v-model="paperTitle"
            size="mini"
            placeholder="检索论文"
            @keyup.enter.native="doSearch(paperTitle)"
          >
            <template #suffix>
              <i
                class="el-input__icon el-icon-search"
                style="cursor: pointer"
                @click="doSearch(paperTitle)"
              ></i>
            </template>
          </el-input>
        </template>
        <template #default="papersData">
          <el-button
            size="mini"
            type="danger"
            @click="openUpdateDialog(papersData.row)"
          >
            修改
          </el-button>
          <!--TODO: 跳转到论文主页-->
          <el-button size="mini" type="primary" @click="$router.push('/')">
            查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--修改论文信息的对话框-->
    <PapersUpdateDialog
      v-if="showUpdateDialog"
      :paper="paperWaitToUpdate"
      @close="closeUpdateDialog"
      @cancel="showUpdateDialog = false"
    />
    <!--分页-->
    <el-pagination
      layout="prev, pager, next"
      :current-page.sync="page"
      :total="resultCount"
      background
      style="text-align: center; margin-top: 10px"
      @current-change="showNextPage"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Dialog,
  Form,
  FormItem,
  Input,
  Pagination,
  Table,
  TableColumn
} from 'element-ui';
import { PaperInfo } from '~/interfaces/pages/manage/ManagePapersPageComp';
import { basicSearch } from '~/api';
import { contentType } from '~/interfaces/responses/search/SearchResponse';
import PapersUpdateDialog from '~/components/manage/PapersUpdateDialog.vue';

export default Vue.extend({
  name: 'ManagePapers',
  components: {
    PapersUpdateDialog,
    [Dialog.name]: Dialog,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [Pagination.name]: Pagination,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data() {
    return {
      papers: [] as PaperInfo[],
      resultCount: 0,
      page: 1, // 当前页码
      paperTitle: '', // 根据输入的论文名称进行搜索
      showUpdateDialog: false, // 是否显示修改的对话框
      paperWaitToUpdate: {} as PaperInfo // 待修改的paper
    };
  },
  methods: {
    // 对论文类型进行更语义化的转换
    getPaperContentType(type: contentType) {
      return type === 'conference' ? '会议' : '期刊';
    },
    // 打开对话框
    openUpdateDialog(paper: PaperInfo) {
      // 创建一个副本，避免子组件修改此处的数据
      this.paperWaitToUpdate = { ...paper };
      this.showUpdateDialog = true;
    },
    closeUpdateDialog() {
      this.showUpdateDialog = false;
      // 重新请求当前页的数据
      this.showNextPage(this.page);
    },
    // 进行搜索
    async doSearch(title: string) {
      const papersRes = await basicSearch({
        keyword: title,
        page: 1,
        sortKey: 'related'
      });
      // 增加默认值，相当于静默失败，避免500
      const papersData = papersRes.data
        ? papersRes.data
        : { papers: [], size: this.resultCount };
      this.papers = papersData.papers;
      this.resultCount = papersData.size;
      // 重置页码
      this.page = 1;
    },
    // 请求下一页
    async showNextPage(page: number) {
      // 重新请求数据
      const papersRes = await basicSearch({
        keyword: this.paperTitle,
        page,
        sortKey: 'related'
      });
      this.papers = papersRes.data.papers;
    }
  }
});
</script>
