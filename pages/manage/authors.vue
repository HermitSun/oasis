<template>
  <div class="manage-authors-wrapper">
    <!--学者基本信息-->
    <el-table
      ref="authorsTable"
      v-loading="isLoading"
      :data="authors"
      style="width: 100%"
      :row-key="getRowKey"
      @selection-change="selectToMerge"
    >
      <!--无数据的提示-->
      <template #empty>
        <span class="el-table__empty-text">检索学者以进行管理↗</span>
      </template>
      <!--table的内容-->
      <el-table-column type="selection" reserve-selection width="55" />
      <el-table-column prop="authorName" label="姓名" />
      <el-table-column prop="count" label="论文数" />
      <el-table-column prop="citation" label="被引数" />
      <!--搜索框和操作-->
      <el-table-column align="right">
        <template #header>
          <el-input
            v-model="authorName"
            size="mini"
            placeholder="检索学者姓名，例如：Jia Liu"
            @keyup.enter.native="doSearch(authorName)"
          >
            <template #suffix>
              <i
                class="el-input__icon el-icon-search"
                style="cursor: pointer"
                @click="doSearch(authorName)"
              ></i>
            </template>
          </el-input>
        </template>
        <template #default="authorsData">
          <!--跳转到作者主页-->
          <el-button
            size="mini"
            type="primary"
            @click="linkToAuthor(authorsData.row.authorId)"
          >
            查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--合并操作-->
    <div style="text-align: right; margin-top: 20px">
      <el-button size="small" @click="clearSelection">
        取消选择
      </el-button>
      <el-button
        type="primary"
        size="small"
        :disabled="waitToMerge.length <= 1"
        @click="showSelectDestDialog = true"
      >
        合并选中
      </el-button>
    </div>
    <!--确认选择的对话框-->
    <el-dialog :visible="showSelectDestDialog" :before-close="clearDialog">
      <el-select v-model="mergeDest" filterable placeholder="请选择合并目标">
        <el-option
          v-for="author in waitToMerge"
          :key="author.id"
          :label="author.name"
          :value="author.id"
        />
      </el-select>
      <p style="margin-top: 10px">
        所有选中的学者信息会合并到该学者名下。
      </p>
      <template #footer>
        <el-button @click="clearMergeDest">
          取 消
        </el-button>
        <!--未选择时不能合并-->
        <el-button :disabled="!mergeDest" type="primary" @click="doMerge">
          确 定
        </el-button>
      </template>
    </el-dialog>
    <!--分页-->
    <el-pagination
      layout="prev, pager, next"
      :current-page.sync="page"
      :total="totalRecords"
      background
      hide-on-single-page
      style="text-align: center; margin-bottom: 20px"
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
  Dialog,
  Input,
  Option,
  Pagination,
  Select,
  Table,
  TableColumn
} from 'element-ui';
import { ElTable } from 'element-ui/types/table';
import { getAuthorInfo, mergeAuthorInfo } from '~/api';
import { WaitToMergeAuthorInfo } from '~/interfaces/pages/manage/ManageAuthorsPageComp';
import { AuthorInfo } from '~/interfaces/responses/manage/AuthorInfoResponse';
import PaginationMaxSizeLimit from '~/components/mixins/PaginationMaxSizeLimit';
import { ElPaginationTotal } from '~/interfaces/ElPaginationTotal';

export default Vue.extend({
  name: 'ManageAuthors',
  components: {
    [Dialog.name]: Dialog,
    [Input.name]: Input,
    [Option.name]: Option,
    [Pagination.name]: Pagination,
    [Select.name]: Select,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  // 限制分页的最大页数
  mixins: [PaginationMaxSizeLimit],
  data() {
    return {
      authors: [] as AuthorInfo[],
      resultCount: null as ElPaginationTotal,
      page: 1, // 当前页码
      // 待合并的学者
      // 此处需要特别注意的是，需要能够跨页记录
      // TODO: 可以考虑把选择的内容写入localStorage，避免刷新丢失
      waitToMerge: [] as WaitToMergeAuthorInfo[],
      mergeDest: '', // 合并目标
      authorName: '', // 根据输入的学者姓名进行搜索
      showSelectDestDialog: false,
      isLoading: false
    };
  },
  mounted() {
    // 类似于断点续传，注入page和name，提高URL可读性
    if (this.$route.query.page && this.$route.query.name) {
      this.authorName = this.$route.query.name as string;
      this.page = Number(this.$route.query.page);
      this.doSearch(this.authorName, Number(this.$route.query.page), false);
    }
  },
  methods: {
    // 获取row-key，用于跨页记忆
    getRowKey(author: AuthorInfo) {
      return author.authorId;
    },
    // 选择需要合并的学者
    // 只需要他们的姓名和ID
    selectToMerge(authors: AuthorInfo[]) {
      this.waitToMerge = authors.map((author) => ({
        name: author.authorName,
        id: author.authorId
      }));
    },
    // 进行合并
    async doMerge() {
      try {
        await this.$confirm('合并操作不可逆, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        const mergeRes = await mergeAuthorInfo(
          this.waitToMerge.map((author) => author.id),
          this.mergeDest
        );
        if (mergeRes.code === 200) {
          this.$message.success('合并成功');
          // 刷新当前页面
          this.showNextPage(1);
        } else {
          this.$message.error('合并失败：' + mergeRes.msg);
        }
      } catch {
        this.$message({
          type: 'info',
          message: '合并已取消'
        });
      } finally {
        // 清空合并目标，防止误操作
        this.clearMergeDest();
      }
    },
    // 进行搜索
    async doSearch(name: string, page: number = 1, resetPage: boolean = true) {
      if (name) {
        this.isLoading = true;
        const authorsRes = await this.getAuthorInfo(page, name);
        // 请求失败时静默失败
        const authorsData =
          authorsRes && authorsRes.data
            ? authorsRes.data
            : { authors: [], size: 0 };
        this.authors = authorsData.authors;
        // 设置页数
        this.resultCount = authorsData.size;
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
      const authorsRes = await this.getAuthorInfo(page, this.authorName);
      const authorsData =
        authorsRes && authorsRes.data
          ? authorsRes.data
          : { authors: [], size: this.resultCount };
      this.authors = authorsData.authors;
      this.isLoading = false;
    },
    // 跳转到作者画像
    linkToAuthor(id: string) {
      const url = this.$router.resolve({
        path: '/portrait/author',
        query: {
          authorId: id,
          sortKey: 'recent',
          page: '1'
        }
      });
      window.open(url.href, '_blank');
    },
    // 类似于decorator，附加一个路由跳转的功能
    getAuthorInfo(page: number, name: string) {
      this.$router.push({
        path: this.$route.path,
        query: {
          name: this.authorName,
          page: page.toString()
        }
      });
      return getAuthorInfo(page, name);
    },
    // 清理工作
    clearDialog() {
      this.showSelectDestDialog = false;
      this.mergeDest = '';
    },
    clearSelection() {
      const authorsTable = this.$refs.authorsTable as ElTable;
      authorsTable.clearSelection();
    },
    clearMergeDest() {
      this.clearDialog();
      // 也清空备选项
      this.clearSelection();
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
