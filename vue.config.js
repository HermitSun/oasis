const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const merge = require("webpack-merge");
const tsImportPluginFactory = require("ts-import-plugin");

const join = path.join;
const basename = path.basename;
const camel2Dash = require("camel-2-dash");

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
    config.module
      .rule("ts")
      .use("ts-loader")
      .tap(options => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: "element-ui",
                libraryDirectory: "lib",
                camel2DashComponentName: true,
                style: path =>
                  join(
                    "element-ui",
                    "lib",
                    "theme-chalk",
                    `${camel2Dash(basename(path, ".js"))}.css`
                  )
              })
            ]
          }),
          compilerOptions: {
            module: "es2015"
          }
        });
        return options;
      });
  },
  devServer: {
    https: false,
    open: true,
    port: 8888
  }
};
