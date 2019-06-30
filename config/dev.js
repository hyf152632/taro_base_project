// eslint-disable-next-line import/no-commonjs
module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
  },
  weapp: {},
  h5: {
    // 配置 server 及跨域
    // 可参考： https://github.com/js-newbee/taro-yanxuan/blob/master/config/dev.js
    devServer: {
      // port: 10086
      // https: true
    }
  }
}
