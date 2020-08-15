[![Codacy Badge](https://api.codacy.com/project/badge/Grade/8814a02e19c1483d94c5b6ed53177cb9)](https://app.codacy.com/manual/HermitSun/oasis?utm_source=github.com&utm_medium=referral&utm_content=HermitSun/oasis&utm_campaign=Badge_Grade_Dashboard)
# OASIS [![CircleCI](https://circleci.com/gh/HermitSun/oasis.svg?style=svg&circle-token=0880e307ee9e49552c4265dd0b5e7bb131d861fa)]()

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
