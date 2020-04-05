<template>
  <div class="manage-journals-wrapper">
    <!--机构基本信息-->
    <el-table
      ref="journals"
      v-loading="isLoading"
      :data="journals"
      style="width: 100%"
    >
      <!--无数据的提示-->
      <template #empty>
        <span class="el-table__empty-text">检索期刊以进行管理↗</span>
      </template>
      <!--table的内容-->
      <el-table-column type="index" width="50" />
      <el-table-column prop="name" label="期刊名" />
      <!--搜索框和操作-->
      <el-table-column align="right">
        <template #header>
          <el-input
            v-model="journalName"
            size="mini"
            placeholder="检索期刊名称，例如：ME"
            @keyup.enter.native="doSearch(journalName)"
          >
            <template #suffix>
              <i
                class="el-input__icon el-icon-search"
                style="cursor: pointer"
                @click="doSearch(journalName)"
              ></i>
            </template>
          </el-input>
        </template>
        <template #default="journalsData">
          <el-button
            size="mini"
            type="danger"
            @click="openUpdateDialog(journalsData.row.name)"
          >
            修改名称
          </el-button>
          <!--跳转到期刊主页-->
          <el-button
            size="mini"
            type="primary"
            @click="linkToJournal(journalsData.row.name)"
          >
            查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--修改期刊信息的对话框-->
    <el-dialog :visible="showUpdateDialog" :before-close="clearUpdate">
      <div style="margin-bottom: 10px">
        请输入修改后的期刊名称：
      </div>
      <el-input v-model="updateDestName" />
      <template #footer>
        <el-button @click="clearUpdate">
          取 消
        </el-button>
        <el-button :disabled="!updateDestName" type="primary" @click="doUpdate">
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
      style="text-align: center; margin-bottom: 20px"
      @current-change="showNextPage"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Dialog, Input, Pagination, Table, TableColumn } from 'element-ui';
import { getJournalInfo, updateJournalInfo } from '~/api';
import PaginationMaxSizeLimit from '~/components/mixins/PaginationMaxSizeLimit';
import { JournalInfo } from '~/interfaces/responses/manage/JournalInfoResponse';

export default Vue.extend({
  name: 'ManageJournals',
  components: {
    [Dialog.name]: Dialog,
    [Input.name]: Input,
    [Pagination.name]: Pagination,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  // 限制分页的最大页数
  mixins: [PaginationMaxSizeLimit],
  data() {
    return {
      journals: [] as JournalInfo[],
      resultCount: 0,
      page: 1, // 当前页码
      journalName: '', // 根据输入的期刊名称进行搜索
      showUpdateDialog: false, // 显示修改的对话框
      waitToUpdateName: '', // 等待更新的名称
      updateDestName: '', // 更新后的名称
      isLoading: false // 是否正在加载
    };
  },
  created() {
    // 类似于断点续传，注入page和name，提高URL可读性
    if (this.$route.query.page && this.$route.query.name) {
      this.journalName = this.$route.query.name as string;
      this.page = Number(this.$route.query.page);
      this.doSearch(this.journalName, Number(this.$route.query.page), false);
    }
  },
  methods: {
    // 打开对话框
    openUpdateDialog(srcName: string) {
      this.showUpdateDialog = true;
      this.waitToUpdateName = srcName;
      this.updateDestName = srcName;
    },
    // 进行更新
    async doUpdate() {
      try {
        await this.$confirm('修改操作不可逆, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        const updateRes = await updateJournalInfo(
          this.waitToUpdateName,
          this.updateDestName
        );
        if (updateRes.code === 200) {
          this.$message.success('修改成功');
          // 刷新当前页面
          this.showNextPage(1);
        } else {
          this.$message.error('修改失败：' + updateRes.msg);
        }
      } catch {
        this.$message({
          type: 'info',
          message: '修改已取消'
        });
      } finally {
        this.clearUpdate();
      }
    },
    // 进行搜索
    async doSearch(name: string, page: number = 1, resetPage: boolean = true) {
      if (name) {
        this.isLoading = true;
        const journalsRes = await this.getJournalInfo(page, name);
        const journalsData =
          journalsRes && journalsRes.data
            ? journalsRes.data
            : { journals: [], size: 0 };
        this.journals = journalsData.journals;
        // 设置页数
        this.resultCount = journalsData.size;
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
      const journalsRes = await this.getJournalInfo(page, this.journalName);
      const journalsData =
        journalsRes && journalsRes.data
          ? journalsRes.data
          : { journals: [], size: this.resultCount };
      this.journals = journalsData.journals;
      this.isLoading = false;
    },
    // 跳转到期刊画像
    linkToJournal(name: string) {
      const url = this.$router.resolve({
        path: '/portrait/conference',
        query: {
          conference: name
        }
      });
      window.open(url.href, '_blank');
    },
    // 类似于decorator，附加一个路由跳转的功能
    getJournalInfo(page: number, name: string) {
      this.$router.push({
        path: this.$route.path,
        query: {
          name: this.journalName,
          page: page.toString()
        }
      });
      return getJournalInfo(page, name);
    },
    // 清理工作
    clearUpdate() {
      this.showUpdateDialog = false;
      this.waitToUpdateName = '';
      this.updateDestName = '';
    }
  }
});
</script>
