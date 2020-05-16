1. 前端遵守eslint的规范:
    
    vue/essential + vue/prettier+ vue/typescript

2. 采用Git Flow的工作流。具体细节如下：

   - master分支：产品代码。只能从其他分支合并，**不允许**直接修改。

     该分支会触发CI/CD。

   - develop分支：开发分支，用于充当开发的基线。主要从其他分支合并。

     该分支会触发CI/CD。

     如果有需要，可以在经过讨论后，将尚未完成或未稳定的feature分支合并到本分支，并在提交信息中注明WIP(Working In Progress)。如：

     `wip(user-info): 增加用户个人档案 `

   - feature分支：用于开发新功能。功能开发完成后，将分支内容合并到develop分支，并删除该分支。

     该分支命名为`feature/[功能名]`。

   - release分支：用于发布新版本。版本发布完成后，将分支内容合并到master和develop分支，并删除该分支。

     该分支会触发CI/CD。

     该分支命名为`release/[版本号]`。版本号格式规定如下：`x.y.[z]`，其中x为当前迭代数，y为该迭代已发布的功能数 + 1，z为该版本的修复补丁数，为0时可以不写。例如，迭代一的第一个功能发布后，版本号应为1.1。初始版本号为1.0。对迭代二的第一个发布版本进行修复后，版本号应为2.1.1。

   - hotfix分支：用于修复已发布版本中的bug。版本发布完成后，将分支内容合并到master和develop分支，并删除该分支。

     该分支命名为`hotfix/[错误名]`。

3. 对分支的粒度进行调整，不再以功能 / 用例为单位，而是以“领域”为单位，对分支进行组织。

    例如，学者画像、机构画像、研究关键字画像，应该组织为一个分支（画像）。

4. 每次提交必须有明确的意义，并且在Commit Message中描述清楚。具体细节如下：

   - 格式：`type[(scope)]: message`，如`fix(search): some message`。其中，type为提交类型（具体类型将在下一点中说明），scope为本次修改的范围（功能），message为本次提交的信息。
   - 提交类型如下：
     - build：修改项目构建信息
     - ci：调整CI流程
     - chore：调整项目配置
     - docs：修改文档
     - feat：发布功能
     - fix：修复bug
     - perf：优化性能
     - refactor：进行重构
     - revert：回退版本
     - style：调整格式
     - test：增加测试
     - wip：尚未完成的功能
   - 提交信息使用小驼峰。
