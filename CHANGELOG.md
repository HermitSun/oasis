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
