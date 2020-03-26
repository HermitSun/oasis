<template>
  <el-dialog visible :before-close="closeDialog">
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
      <!--TODO: 更好的处理数组的方式-->
      <el-form-item label="作者" prop="authors">
        <el-input
          v-model="paperForm.authors"
          placeholder="请输入作者（使用英文逗号','分隔）"
        />
      </el-form-item>
      <el-form-item label="摘要" prop="_abstract">
        <el-input
          v-model="paperForm._abstract"
          type="textarea"
          autosize
          placeholder="请输入摘要"
        />
      </el-form-item>
      <!--TODO: 更好的处理数组的方式-->
      <el-form-item label="关键词" prop="keywords">
        <el-input
          v-model="paperForm.keywords"
          type="textarea"
          autosize
          placeholder="请输入关键词（使用英文逗号','分隔）"
        />
      </el-form-item>
      <el-form-item label="出版年份" prop="publicationYear">
        <el-date-picker
          v-model="paperForm.publicationYear"
          type="year"
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
      <el-button @click="closeDialog">
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
  Select
} from 'element-ui';
import { ElForm } from 'element-ui/types/form';
import { PaperFrom } from '~/interfaces/pages/manage/ManagePapersPageComp';
import {
  ElFormValidationFunction,
  ElFormValidationRules
} from '~/interfaces/ElFormValidationRules';
import { updatePaperInfo } from '~/api';

// 校验作者姓名
const authorNameValidator: ElFormValidationFunction = (_, value, callback) => {
  if (value === '') {
    callback(new Error('请输入论文作者'));
  } else {
    const authors = value.split(',');
    // 分割前后没有变化，说明格式不符合
    if (authors[0] === value) {
      callback(new Error("论文作者之间请用英文逗号','分隔"));
    }
    const notEmptyAuthors = authors.filter((author) => author !== '');
    if (authors.length !== notEmptyAuthors.length) {
      callback(new Error('不能有姓名为空的作者'));
    }
    callback();
  }
};

// 校验关键词
const keywordsValidator: ElFormValidationFunction = (_, value, callback) => {
  if (value === '') {
    callback(new Error('请输入关键词'));
  } else {
    const authors = value.split(',');
    // 分割前后没有变化，说明格式不符合
    if (authors[0] === value) {
      callback(new Error("论文关键词之间请用英文逗号','分隔"));
    }
    // 不为空串，且不为全是空格的串
    const notEmptyAuthors = authors.filter(
      (author) => author !== '' && !/^[ ]+$/.test(author)
    );
    if (authors.length !== notEmptyAuthors.length) {
      callback(new Error('不能有为空的关键词'));
    }
    callback();
  }
};

export default Vue.extend({
  name: 'PapersUpdateDialog',
  components: {
    [DatePicker.name]: DatePicker,
    [Dialog.name]: Dialog,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [Select.name]: Select,
    [Option.name]: Option
  },
  props: {
    paper: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      // 把数组转换成字符串进行绑定
      paperForm: {
        ...this.paper,
        authors: this.paper.authors.toString(),
        keywords: this.paper.keywords.toString()
      } as PaperFrom,
      paperRules: {
        title: { required: true, message: '请输入论文标题', trigger: 'blur' },
        authors: {
          validator: authorNameValidator,
          trigger: 'blur'
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
          trigger: 'blur'
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
      } as ElFormValidationRules
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
          authors: this.paperForm.authors.split(','),
          keywords: this.paperForm.keywords.split(',')
        };
        const updateRes = await updatePaperInfo(updateData);
        if (updateRes.code === 200) {
          this.$message.success('修改成功');
        } else {
          this.$message.error('修改失败：' + updateRes.msg);
        }
      } catch {
        this.$message({
          type: 'info',
          message: '修改已取消'
        });
      } finally {
        this.closeDialog();
      }
    },
    // 清理工作
    closeDialog() {
      this.$emit('close');
    }
  }
});
</script>
