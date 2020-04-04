<template>
  <div class="manage-conferences-wrapper">
    <!--机构基本信息-->
    <el-table
      ref="conferences"
      v-loading="isLoading"
      :data="conferences"
      style="width: 100%"
    >
      <!--无数据的提示-->
      <template #empty>
        <span class="el-table__empty-text">检索会议以进行管理↗</span>
      </template>
      <!--table的内容-->
      <el-table-column type="index" width="50" />
      <el-table-column prop="name" label="会议名" />
      <!--搜索框和操作-->
      <el-table-column align="right">
        <template #header>
          <el-input
            v-model="conferenceName"
            size="mini"
            placeholder="检索会议名称，例如：ICSE"
            @keyup.enter.native="doSearch(conferenceName)"
          >
            <template #suffix>
              <i
                class="el-input__icon el-icon-search"
                style="cursor: pointer"
                @click="doSearch(conferenceName)"
              ></i>
            </template>
          </el-input>
        </template>
        <template #default="conferencesData">
          <el-button
            size="mini"
            type="danger"
            @click="openUpdateDialog(conferencesData.row.name)"
          >
            修改名称
          </el-button>
          <!--跳转到会议主页-->
          <el-button
            size="mini"
            type="primary"
            @click="linkToConference(conferencesData.row.name)"
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
import { getConferenceInfo, updateConferenceInfo } from '~/api';
import PaginationMaxSizeLimit from '~/components/mixins/PaginationMaxSizeLimit';
import { ConferenceInfo } from '~/interfaces/responses/manage/ConferenceInfoResponse';

export default Vue.extend({
  name: 'ManageConferences',
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
      conferences: [] as ConferenceInfo[],
      resultCount: 0,
      page: 1, // 当前页码
      conferenceName: '', // 根据输入的期刊名称进行搜索
      showUpdateDialog: false, // 显示修改的对话框
      waitToUpdateName: '', // 等待更新的名称
      updateDestName: '', // 更新后的名称
      isLoading: false
    };
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
        const updateRes = await updateConferenceInfo(
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
    async doSearch(name: string) {
      if (name) {
        this.isLoading = true;
        const conferencesRes = await getConferenceInfo(1, name);
        // 增加默认值，相当于静默失败，避免500
        const conferencesData =
          conferencesRes && conferencesRes.data
            ? conferencesRes.data
            : { conferences: [], size: 0 };
        this.conferences = conferencesData.conferences;
        // 设置页数
        this.resultCount = conferencesData.size;
        // 重置页码
        this.page = 1;
        this.isLoading = false;
      } else {
        this.$message.warning('请输入搜索内容');
      }
    },
    // 请求下一页
    async showNextPage(page: number) {
      this.isLoading = true;
      // 重新请求数据
      const conferencesRes = await getConferenceInfo(page, this.conferenceName);
      // 增加默认值，相当于静默失败，避免500
      // 总页数不变
      const conferencesData =
        conferencesRes && conferencesRes.data
          ? conferencesRes.data
          : { conferences: [], size: this.resultCount };
      this.conferences = conferencesData.conferences;
      this.isLoading = false;
    },
    // 跳转到会议画像
    linkToConference(name: string) {
      const url = this.$router.resolve({
        path: '/portrait/conference',
        query: {
          conference: name
        }
      });
      window.open(url.href, '_blank');
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
