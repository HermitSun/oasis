# frontend-oasis

## Project setup
```shell script
npm install
```
但是由于众所周知的原因，本项目在安装依赖时可能会卡住。
国内用户请使用以下命令安装依赖：
```shell script
npm install chromedriver --chromedriver_cdnurl=http://npm.taobao.org/mirrors/chromedriver \
&& npm install geckodriver --geckodriver_cdnurl=http://npm.taobao.org/mirrors/geckodriver \
&& npm install --registry=https://registry.npm.taobao.org
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
