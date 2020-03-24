<template>
  <div class="manage-authors-wrapper">
    <!--学者基本信息-->
    <el-table
      ref="authorsTable"
      :data="authors"
      style="width: 100%"
      :row-key="getRowKey"
      @selection-change="selectToMerge"
    >
      <el-table-column type="selection" reserve-selection width="55" />
      <el-table-column prop="authorName" label="姓名" width="180" />
      <el-table-column prop="count" label="论文数" width="180" />
      <el-table-column prop="citation" label="被引数" width="180" />
      <!--搜索框-->
      <el-table-column>
        <template #header>
          <el-input
            v-model="authorName"
            size="mini"
            placeholder="检索学者姓名"
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
    <el-dialog :visible="showSelectDestDialog">
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
        <el-button type="primary" @click="doMerge">
          确 定
        </el-button>
      </template>
    </el-dialog>
    <!--分页-->
    <el-pagination
      layout="prev, pager, next"
      :current-page="page"
      :total="resultCount"
      background
      style="text-align: center; margin-bottom: 20px"
      @current-change="showNextPage"
    />
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
import {
  ManageAuthorsPageComp,
  WaitToMergeAuthorInfo
} from '~/interfaces/pages/manage/ManageAuthorsPageComp';
import { AuthorInfo } from '~/interfaces/responses/manage/AuthorInfoResponse';

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
  async asyncData() {
    const authorsRes = await getAuthorInfo();
    return {
      authors: authorsRes.data.authors,
      resultCount: authorsRes.data.size
    };
  },
  data() {
    return {
      page: 1, // 当前页码
      // 待合并的学者
      // 此处需要特别注意的是，需要能够跨页记录
      waitToMerge: [] as WaitToMergeAuthorInfo[],
      mergeDest: '', // 合并目标
      authorName: '', // 根据输入的学者姓名进行搜索
      showSelectDestDialog: false
    } as ManageAuthorsPageComp;
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
          this.$message.success('合并成功!');
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
    async doSearch(name: string) {
      const authorsRes = await getAuthorInfo(1, name);
      this.authors = authorsRes.data.authors;
    },
    // 请求下一页
    async showNextPage(page: number) {
      // 重新请求数据
      const authorsRes = await getAuthorInfo(page);
      this.authors = authorsRes.data.authors;
      // 设置选择状态
    },
    // 清理工作
    clearSelection() {
      const authorsTable = this.$refs.authorsTable as ElTable;
      authorsTable.clearSelection();
    },
    clearMergeDest() {
      this.showSelectDestDialog = false;
      this.mergeDest = '';
      // 也清空备选项
      this.clearSelection();
    }
  }
});
</script>
