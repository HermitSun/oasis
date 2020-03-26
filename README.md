# OASIS

## 发布

因为服务器性能过低，无法完成CI，故放弃。

每次想要发布版本前，请在本地的**项目根目录**执行如下命令：

Windows命令行：

```shell script
call ci/build-windows.cmd
```

Windows PowerShell：

```shell script
ci/build-windows.cmd
```

*NIX（未测试OSX）:

```shell script
sh ci/build-unix.sh
```

## 分页

关于分页，后面可能需要对管理端的分页进行调整。

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
