const path = require("path");
const resolve = dir => require("path").join(__dirname, dir)
module.exports = {
  publicPath: "./",
  // 后续开发直接改为生产包名
  outputDir: "ColorfulLife_discountShops",
  productionSourceMap: false,
  configureWebpack: config => {
    config.name = "优惠商户";
    // config.resolve.alias.comps = require("path").join(__dirname, "src/components");
  },
  chainWebpack(config) {
    // 1、webpack中本来有处理svg的rule，需要过滤掉icons/svg
    config.module.rule("svg")
      .exclude.add(resolve("src/assets/icons"));
    // 2、svg-loader配置
    config.module.rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/icons")).end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
    // 3 less公共变量
    // 需要安装 style-resources-loader 与stylus一致
     const oneOfsMap = config.module.rule("less").oneOfs.store;
     oneOfsMap.forEach(item => {
       item
         .use("style-resources-loader")
         .loader("style-resources-loader")
         .options({
           // 需要插入的文件路径
           patterns: "./src/style/variable.less"
           // 需要插入的文件路径数组
           // patterns: ["./path/to/vars.less", "./path/to/mixins.less"]
         })
         .end();
     });
  },
  devServer: {
    proxy: {
      '/AppPrj4': {
        target: 'https://www.alex188.cn/AppPrj4',
        changeOrigin: true,
        ws: true,
      }
    },
  }
}