<template>
  <div class="manage-affiliations-wrapper">
    <!--机构基本信息-->
    <el-table
      ref="affiliationsTable"
      :data="affiliations"
      style="width: 100%"
      :row-key="getRowKey"
      @selection-change="selectToMerge"
    >
      <el-table-column type="selection" reserve-selection width="55" />
      <el-table-column prop="name" label="机构名" />
      <!--搜索框和操作-->
      <el-table-column align="right">
        <template #header>
          <el-input
            v-model="affiliationName"
            size="mini"
            placeholder="检索机构名称"
            @keyup.enter.native="doSearch(affiliationName)"
          >
            <template #suffix>
              <i
                class="el-input__icon el-icon-search"
                style="cursor: pointer"
                @click="doSearch(affiliationName)"
              ></i>
            </template>
          </el-input>
        </template>
        <!--TODO: 跳转到机构主页-->
        <el-button size="mini" type="primary" @click="$router.push('/')">
          查看详情
        </el-button>
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
          v-for="affiliation in waitToMerge"
          :key="affiliation.id"
          :label="affiliation.name"
          :value="affiliation.id"
        />
      </el-select>
      <p style="margin-top: 10px">
        所有选中的机构信息会合并到该机构名下。
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
import { getAffiliationInfo, mergeAffiliationInfo } from '~/api';
import { WaitToMergeAuthorInfo } from '~/interfaces/pages/manage/ManageAuthorsPageComp';
import { AffiliationInfo } from '~/interfaces/responses/manage/AffiliationInfoResponse';
import { ManageAffiliationsPageComp } from '~/interfaces/pages/manage/ManageAffiliationsPageComp';

export default Vue.extend({
  name: 'ManageAffiliations',
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
    const affiliationsRes = await getAffiliationInfo();
    return {
      affiliations: affiliationsRes.data.affiliations,
      resultCount: affiliationsRes.data.size
    };
  },
  data() {
    return {
      page: 1, // 当前页码
      // 待合并的机构
      // 此处需要特别注意的是，需要能够跨页记录
      waitToMerge: [] as WaitToMergeAuthorInfo[],
      mergeDest: '', // 合并目标
      affiliationName: '', // 根据输入的机构名称进行搜索
      showSelectDestDialog: false
    } as ManageAffiliationsPageComp;
  },
  methods: {
    // 获取row-key，用于跨页记忆
    getRowKey(affiliation: AffiliationInfo) {
      return affiliation.name;
    },
    // 选择需要合并的机构
    // 只需要名称
    selectToMerge(affiliations: AffiliationInfo[]) {
      this.waitToMerge = affiliations.map((author) => ({
        name: author.name,
        id: author.name
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
        const mergeRes = await mergeAffiliationInfo(
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
    async doSearch(name: string) {
      const affiliationsRes = await getAffiliationInfo(1, name);
      this.affiliations = affiliationsRes.data.affiliations;
      // 重置页码和搜索内容
      this.page = 1;
      this.affiliationName = '';
    },
    // 请求下一页
    async showNextPage(page: number) {
      // 重新请求数据
      const affiliationsRes = await getAffiliationInfo(page);
      this.affiliations = affiliationsRes.data.affiliations;
    },
    // 清理工作
    clearDialog() {
      this.showSelectDestDialog = false;
      this.mergeDest = '';
    },
    clearSelection() {
      const affiliationsTable = this.$refs.affiliationsTable as ElTable;
      affiliationsTable.clearSelection();
    },
    clearMergeDest() {
      this.clearDialog();
      // 同时清空备选项
      this.clearSelection();
    }
  }
});
</script>
