# OASIS [![CircleCI](https://circleci.com/gh/HermitSun/oasis.svg?style=svg)](https://circleci.com/gh/HermitSun/oasis)

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/60d45ecbcf1f47cbb145447bc5bd89f6)](https://www.codacy.com/manual/HermitSun/oasis?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=HermitSun/oasis&amp;utm_campaign=Badge_Grade)

## 使用说明

``` bash
# 安装依赖
$ npm install

# 在localhost:3000启动开发服务器
$ npm run dev

# 打包并运行
$ npm run build
$ npm run start

# 生成静态站点
$ npm run generate

# 因为服务器性能过低，无法完成CI，故采用这种方式
# 发布到wensun.top
$ npm run release

# 重新构建element-ui主题
# 注意，因为依赖过旧，需要node版本 < 12
# 建议使用10.x LTS
$ npm run theme
```
