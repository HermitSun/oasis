<template>
  <el-dialog visible :before-close="closeDialogWithoutChange">
    <!--修改的表单-->
    <el-form
      ref="paperForm"
      :model="paperForm"
      :rules="paperRules"
      label-width="100px"
      hide-required-asterisk
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="paperForm.title" placeholder="请输入标题" />
      </el-form-item>
      <!--不能修改作者数量-->
      <el-form-item label="作者" prop="authors">
        <template v-for="(_, i) of paperForm.authors">
          <el-input
            :key="i"
            v-model="paperForm.authors[i]"
            placeholder="请输入作者姓名"
          />
        </template>
      </el-form-item>
      <el-form-item label="摘要" prop="_abstract">
        <el-input
          v-model="paperForm._abstract"
          type="textarea"
          autosize
          placeholder="请输入摘要"
        />
      </el-form-item>
      <!--使用Tag管理关键字-->
      <!--并不打算做修改功能，可以删除再添加-->
      <el-form-item label="关键词" prop="keywords">
        <el-tag
          v-for="(keyword, i) of paperForm.keywords"
          :key="i"
          size="medium"
          closable
          @close="removeKeyword(i)"
        >
          {{ keyword }}
        </el-tag>
        <!--添加关键字-->
        <el-input
          v-if="showNewKeywordInput"
          ref="addKeywordInput"
          v-model="newKeyword"
          size="small"
          @keyup.enter.native="addKeyword"
          @blur="addKeyword"
        />
        <el-button v-else size="small" @click="showKeywordInput">
          + 添加关键字
        </el-button>
      </el-form-item>
      <el-form-item label="出版年份" prop="publicationYear">
        <el-date-picker
          v-model="paperForm.publicationYear"
          type="year"
          value-format="yyyy"
          placeholder="请选择出版年份"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="类型" prop="contentType">
        <el-select
          v-model="paperForm.contentType"
          placeholder="请选择类型"
          style="width: 100%"
        >
          <el-option label="会议" value="conference" />
          <el-option label="期刊" value="periodicals" />
        </el-select>
      </el-form-item>
      <el-form-item label="发表位置" prop="publicationName">
        <el-input
          v-model="paperForm.publicationName"
          placeholder="请输入发表位置"
        />
      </el-form-item>
    </el-form>
    <!--底部的操作栏-->
    <template #footer>
      <el-button @click="closeDialogWithoutChange">
        取 消
      </el-button>
      <el-button type="primary" @click="submitPaperUpdate">
        确 定
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  DatePicker,
  Dialog,
  Form,
  FormItem,
  Input,
  Option,
  Select,
  Tag
} from 'element-ui';
import { ElForm } from 'element-ui/types/form';
import { PaperFrom } from '~/interfaces/pages/manage/ManagePapersPageComp';
import {
  ElFormValidationFunction,
  ElFormValidationRules
} from '~/interfaces/ElFormValidationRules';
import { updatePaperInfo } from '~/api';

export default Vue.extend({
  name: 'PapersUpdateDialog',
  components: {
    [DatePicker.name]: DatePicker,
    [Dialog.name]: Dialog,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [Option.name]: Option,
    [Select.name]: Select,
    [Tag.name]: Tag
  },
  props: {
    index: { type: Number, default: 0 },
    paper: { type: Object, default: () => ({}) }
  },
  data() {
    // 校验作者姓名
    const authorNameValidator: ElFormValidationFunction<string[]> = (
      _,
      authorNames,
      callback
    ) => {
      if (authorNames.length === 0 && !this.$data.newKeyword) {
        callback(new Error('请输入论文作者'));
      } else {
        for (const authorName of authorNames) {
          if (!authorName) {
            callback(new Error('作者姓名不能为空'));
            return;
          }
        }
        callback();
      }
    };

    // 校验关键词
    // 允许关键词为空，有些文章确实没有关键词
    const keywordsValidator: ElFormValidationFunction = (
      _,
      keywords,
      callback
    ) => {
      for (const keyword of keywords) {
        if (!keyword) {
          callback(new Error('关键词不能为空'));
          return;
        }
      }
      callback();
    };

    return {
      // 把数组转换成字符串进行绑定
      paperForm: {
        ...this.paper,
        authors: this.paper.authors,
        keywords: this.paper.keywords,
        publicationYear: this.paper.publicationYear.toString()
      } as PaperFrom,
      paperRules: {
        title: { required: true, message: '请输入论文标题', trigger: 'blur' },
        authors: {
          validator: authorNameValidator,
          trigger: 'change'
        },
        _abstract: {
          required: true,
          message: '请输入论文摘要',
          trigger: 'blur'
        },
        publicationYear: {
          required: true,
          message: '请选择出版年份',
          trigger: 'change'
        },
        keywords: {
          validator: keywordsValidator,
          trigger: 'change'
        },
        contentType: {
          required: true,
          message: '请选择论文类型',
          trigger: 'change'
        },
        publicationName: {
          required: true,
          message: '请输入论文出版位置',
          trigger: 'blur'
        }
      } as ElFormValidationRules,
      // 添加新的关键字
      newKeyword: '',
      showNewKeywordInput: false
    };
  },
  methods: {
    // 提交更新操作
    submitPaperUpdate() {
      const paperForm = this.$refs.paperForm as ElForm;
      paperForm.validate((valid) => {
        if (valid) {
          this.doUpdate();
        } else {
          this.$message.error('请正确填写论文信息');
          return false;
        }
      });
    },
    // 进行更新
    async doUpdate() {
      try {
        await this.$confirm('修改操作不可逆, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        const updateData = {
          ...this.paperForm,
          publicationYear: Number(this.paperForm.publicationYear)
        };
        const updateRes = await updatePaperInfo(updateData);
        if (updateRes.code === 200) {
          this.$message.success('修改成功');
        } else {
          this.$message.error('修改失败：' + updateRes.msg);
        }
        this.closeDialog();
      } catch {
        this.$message({
          type: 'info',
          message: '修改已取消'
        });
        this.closeDialogWithoutChange();
      }
    },
    // 对论文关键词进行的增删查（没有改）
    showKeywordInput() {
      this.showNewKeywordInput = true;
      this.$nextTick(() => {
        const addKeywordInput = this.$refs.addKeywordInput as Vue;
        (addKeywordInput.$refs.input as HTMLElement).focus();
      });
    },
    removeKeyword(index: number) {
      this.paperForm.keywords.splice(index, 1);
      console.log(this.paperForm.keywords);
    },
    addKeyword() {
      const inputValue = this.newKeyword;
      if (inputValue) {
        this.paperForm.keywords.push(inputValue);
      }
      this.showNewKeywordInput = false;
      this.newKeyword = '';
    },
    // 清理工作
    closeDialog() {
      // 将修改过的数据返回给父组件，避免再次请求
      this.$emit('close', this.index, {
        ...this.paperForm,
        publicationYear: Number(this.paperForm.publicationYear)
      });
    },
    closeDialogWithoutChange() {
      this.$emit('cancel');
    }
  }
});
</script>

<style lang="less">
.el-tag {
  margin-right: 10px;
}
</style>
