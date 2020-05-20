# 3.2 (2020-05-20)

### Bug Fixes

- 修复排名页可能出现内存泄漏的问题
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
