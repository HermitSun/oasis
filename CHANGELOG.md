# 3.3 (2020-05-28)

### Bug Fixes

- 修复公共页面缺乏样式文件的问题
- 修复echarts加载有时会报错的问题(#65)

### Code Refactoring

- 优化人才库样式

### Features

- 完成人才库页面
- 增加3D trend

# 3.2.2 (2020-05-21)

### Bug Fixes

- 修复数据导入初始进度会变成NaN的问题(#63)
- 修复数据导入清空日期后URL里只有date的问题(#64)

### Code Refactoring

- 优化基础人才库样式
- 对首页进行重构

### Features

- 数据导入在每个页面都增加新建任务按钮(#60)
- 增加数据导入任务开始时的提示

### BREAKING CHANGES

- 首页的样式发生了重大变化

# 3.2.1 (2020-05-20)

### Bug Fixes

- 修复研究方向画像页点击关键词页面不刷新的问题(#58)

### Code Refactoring

- 对画像页进行重构
- 按字典序引入components
- 简化设置默认值的方式（三目运算符 -> `||`）

### Performance Improvements

- 画像页不再重复渲染输入框和加载词云（重构）

# 3.2 (2020-05-20)

### Bug Fixes

- 实现可能出现内存泄漏的问题
- 修复SearchSortKeyComp的emit方法错误

### Code Refactoring

- 对数据导入页进行重构

### Features

- 增加管理端数据导入功能
- 增加命令搜索功能

### Performance Improvements

- 提高SEO权重（`nofollow`）
- 排名页采用更轻量的缓存实现

# 3.1.1 (2020-05-16)

### Code Refactoring

- 对排名页进行重构

### Performance Improvements

- 对排名页进行缓存

# 3.1 (2020-05-16)

### Bug Fixes

- 请求取消后不再提示Error(#54)
- 首页弹出取消请求信息(#55)
- 排名页无法展开(#56)

### Code Refactoring

- 完善词云加载完成的判断条件
- 改用`Promise.all`进行并发请求
- 补充研究方向画像的类型

### Features

- 增加研究方向排名
- 增加echarts基本配置

### Performance Improvements

- 减少学者排名页图表的阻塞时间
