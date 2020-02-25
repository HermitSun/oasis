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
## 关于json-server
使用json-server模拟后端假数据, 默认使用本地3180端口，可在`vue.config.js`中修改
注： 当前只有`get`方法使用了json-server
1. `src/api/json-server/ResponseJson.json` 
    - 访问url`/一级路由1/二级路由1`获取返回值```{code:200}```
    - *二级路由需要id来区分*
        ```json
        {
           "一级路由1":[
                {
                    "id":"二级路由1",
                    "code":200
                },
                {
                    "id":"二级路由2",
                    "code":200
                }
           ],
            "一级路由2":[
                  {
                      "id":"二级路由3",
                      "code":200
                  },
                  {
                      "id":"二级路由4",
                      "code":200
                  }
            ]
        }
2. 替换为真实接口
通过`process.env.NODE_ENV !== "production"`判断

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
