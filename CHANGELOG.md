从3.1版本起，对每个版本的变更进行跟踪。

---

# 4.3 (2020-07-30)

### Bug Fixes

- 修复点击推荐机构时出现400的问题
- 修复在高级搜索页面出现filter的问题
- 修复searchBar遮挡高级搜索的问题
- 修复高级排名Time Range存在歧义的问题
- 修复首页轮播的箭头覆盖高级搜索框的问题(#75)

### Code Refactoring

- 完善移动端适配
- 调整学者关系图样式

### Features

- 添加移动端的menu

# 4.2.1 (2020-07-30)

### Bug Fixes

- 修复网络图返回上一层的行为出现错误的问题(#73)
- 修复切换搜索关键词时filter不更新的问题

### Code Refactoring

- 移动端适配
- 部分样式调整
- 将普通搜索的filter移动到drawer中

### Performance Improvements

- 移除无效的依赖和组件
- 减少推荐请求数量

### Features

- 增加普通搜索推荐

# 4.2.0 (2020-07-30)

### Bug Fixes

- 修复学者关系图回退失败的问题(#72)

### Performance Improvements

- 点击当前结点时不再触发关系图重绘

### Features

- 浏览器后退键可以返回关系图上一层

# 4.1.4 (2020-07-29)

### Bug Fixes

- 修复排名页高亮显示不正确的问题(#68)
- 修复页面重入时不显示图表的问题
- 修复关系图中权重过低学者在图上消失的问题

### Code Refactoring

- 增加到机构画像的跳转方式(#69)
- 增加近十年无数据的placeholder(#70)
- 完善类型定义
- 重构关系图的实现

### Performance Improvements

- 移除d3pie，删除一些无用或冗余的组件
- 移除图表的resize以减少重绘

# 4.1.3 (2020-07-28)

### Bug Fixes

- 修复画像页和排名页的滚动条溢出

### Performance Improvements

- 懒加载首页的轮播图
- 懒加载标签页

# hotfix/trend-cannot-display (2020-07-28)

### Bug Fixes

- 修复趋势图无法显示的问题

# 4.1.2 (2020-07-28)

### Features

- 完成首页

### Performance Improvements

- 压缩图片

# 4.1.1 (2020-07-27)

### Performance Improvements

- 巨幅减小打包体积

# 4.1 (2020-07-27)

### Bug Fixes

- 修复图标无法显示的问题
- 修复搜索不高亮的问题
- 修复bar的x轴数据问题
- 修复ranking排序标准的bug
- 修复因为npm run theme带来的样式问题
- 修复CDN导入echarts顺序错误的问题

### Code Refactoring

- 调整echarts导入方式为CDN

### Features

- 添加画像页论文计数
- 添加人才库目录

### BREAKING CHANGES

- 将用户端与管理端分离

# 4.0.1 (2020-07-24)

### Bug Fixes

- 修复nav中的路径错误

### Code Refactoring

- 调整样式

# 4.0 (2020-07-23)

### Code Refactoring

- 将部分图表切换为echarts

### BREAKING CHANGES

- 用户端样式完全重构

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
