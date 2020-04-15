<template>
  <div class="manage-papers-wrapper">
    <!--论文基本信息-->
    <el-table
      ref="papersTable"
      v-loading="isLoading"
      :data="papers"
      style="width: 100%"
    >
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
                  <span>{{ author }}</span>
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
      <el-table-column label="作者" width="160">
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
            placeholder="检索论文，例如：DevOps"
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
            @click="openUpdateDialog(papersData.$index, papersData.row)"
          >
            修改
          </el-button>
          <!--跳转到IEEE上的论文页-->
          <el-button
            size="mini"
            type="primary"
            @click="linkToPaper(papersData.row.link)"
          >
            查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--修改论文信息的对话框-->
    <PapersUpdateDialog
      v-if="showUpdateDialog"
      :index="paperWaitToUpdateIndex"
      :paper="paperWaitToUpdate"
      @close="closeUpdateDialog"
      @cancel="showUpdateDialog = false"
    />
    <!--分页-->
    <el-pagination
      layout="prev, pager, next"
      :current-page.sync="page"
      :total="totalRecords"
      background
      hide-on-single-page
      style="text-align: center; margin-top: 10px"
      @current-change="showNextPage"
    />
    <!--超过100页时隐藏-->
    <p v-if="page === 100" class="hide-on-not-related">
      我们已为您隐藏了相关度较低的检索结果。
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Form,
  FormItem,
  Input,
  Pagination,
  Table,
  TableColumn
} from 'element-ui';
import { PaperInfo } from '~/interfaces/pages/manage/ManagePapersPageComp';
import { getPaperInfo } from '~/api';
import { contentType } from '~/interfaces/responses/search/SearchResponse';
import PaginationMaxSizeLimit from '~/components/mixins/PaginationMaxSizeLimit';
import { BasicSearchPayload } from '~/interfaces/requests/search/SearchPayload';
import { ElPaginationTotal } from '~/interfaces/ElPaginationTotal';
import { UpdatePaperInfoPayload } from '~/interfaces/requests/manage/UpdatePaperInfoPayload';

export default Vue.extend({
  name: 'ManagePapers',
  components: {
    PapersUpdateDialog: () =>
      import('~/components/manage/PapersUpdateDialog.vue'),
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [Pagination.name]: Pagination,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  // 限制分页的最大页数
  mixins: [PaginationMaxSizeLimit],
  data() {
    return {
      papers: [] as PaperInfo[],
      resultCount: null as ElPaginationTotal,
      page: 1, // 当前页码
      paperTitle: '', // 根据输入的论文名称进行搜索
      showUpdateDialog: false, // 是否显示修改的对话框
      paperWaitToUpdateIndex: -1, // 待修改的paper的ID
      paperWaitToUpdate: {} as UpdatePaperInfoPayload, // 待修改的paper
      isLoading: false
    };
  },
  mounted() {
    // 类似于断点续传，注入page和name，提高URL可读性
    if (this.$route.query.page && this.$route.query.name) {
      this.paperTitle = this.$route.query.name as string;
      this.page = Number(this.$route.query.page);
      this.doSearch(this.paperTitle, Number(this.$route.query.page), false);
    }
  },
  methods: {
    // 对论文类型进行更语义化的转换
    getPaperContentType(type: contentType) {
      return type === 'conferences' ? '会议' : '期刊';
    },
    // 打开对话框
    openUpdateDialog(index: number, paper: PaperInfo) {
      this.paperWaitToUpdateIndex = index;
      // 创建一个副本，避免子组件修改此处的数据
      this.paperWaitToUpdate = {
        ...paper,
        authors: paper.authors
      };
      this.showUpdateDialog = true;
    },
    closeUpdateDialog(updatedIndex: number, updatedPaper: PaperInfo) {
      this.showUpdateDialog = false;
      // 避免重新请求，在前端进行修改
      // Vue不能检测数组下标变动，需要使用$set
      this.$set(this.papers, updatedIndex, updatedPaper);
    },
    // 进行搜索
    async doSearch(title: string, page: number = 1, resetPage: boolean = true) {
      if (title) {
        this.isLoading = true;
        const papersRes = await this.getPaperInfo({
          keyword: title,
          page,
          sortKey: 'related'
        });
        // 增加默认值，相当于静默失败，避免500
        const papersData = papersRes.data
          ? papersRes.data
          : { papers: [], size: 0 };
        this.papers = papersData.papers.map((paper) => {
          return {
            ...paper,
            authors: paper.authors.map((author) => author.name)
          };
        });
        this.resultCount = papersData.size;
        // 重置页码
        // 但搜索不一定要重置页码
        if (resetPage) {
          this.page = 1;
        }
        this.isLoading = false;
      } else {
        this.$message.warning('请输入搜索内容');
      }
    },
    // 请求下一页
    async showNextPage(page: number) {
      this.isLoading = true;
      // 重新请求数据
      const papersRes = await this.getPaperInfo({
        keyword: this.paperTitle,
        page,
        sortKey: 'related'
      });
      // 增加默认值，相当于静默失败，避免500
      const papersData = papersRes.data
        ? papersRes.data
        : { papers: [], size: this.resultCount as number };
      this.papers = papersData.papers.map((paper) => {
        return {
          ...paper,
          authors: paper.authors.map((author) => author.name)
        };
      });
      this.isLoading = false;
    },
    linkToPaper(link: string) {
      window.open(link, '_blank');
    },
    // 类似于decorator，附加一个路由跳转的功能
    getPaperInfo(payload: BasicSearchPayload) {
      this.$router.push({
        path: this.$route.path,
        query: {
          name: this.paperTitle,
          page: payload.page.toString()
        }
      });
      return getPaperInfo(payload);
    }
  }
});
</script>

<style scoped lang="less">
.hide-on-not-related {
  color: #c0c4cc;
  font-style: italic;
  text-align: center;
  margin-top: 10px;
}
</style>
