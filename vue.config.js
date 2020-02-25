const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function resolve(filename) {
  return path.join(__dirname, filename);
}

// 生产环境部署的路径
const BASE_URL = process.env.NODE_ENV === "production" ? "/oasis" : "/";

module.exports = {
  publicPath: BASE_URL,
  outputDir: "oasis",
  indexPath: "index.html",
  productionSourceMap: false,
  configureWebpack: {
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ["console.log"] // 移除console
            }
          }
        })
      ]
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("views", resolve("src/views"));
    config.resolve.extensions.add("*", ".js", ".json", ".vue", ".ts", ".tsx");
  },
  devServer: {
    https: false,
    open: true,
    port: 8888
  }
};

// 非生产环境启动
if (process.env.NODE_ENV !== "production") {
  /*----------------json-server---------*/
  const jsonServer = require("json-server");
  /*搭建一个server*/
  const apiServer = jsonServer.create();
  /*将db.json关联到server*/
  const apiRouter = jsonServer.router("src/api/json-server/ResponseJson.json");
  const middleWares = jsonServer.defaults();
  apiServer.use(middleWares);
  apiServer.use(apiRouter);
  /*监听端口*/
  apiServer.listen(3180, () => {
    console.log("JSON Server is running");
  });
}
