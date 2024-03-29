//配置路径别名
module.exports = {
  configureWebpack: {
    resolve: {
     alias: {
       'views': '@/views',
       'components': '@/components',
       'network': '@/network',
       'common': '@/common',
       'assets': '@/assets',
     }
    }
  }
}
