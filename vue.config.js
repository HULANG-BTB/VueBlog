module.exports = {
  devServer: {
    proxy: {
      '/data': {
        target: 'http://server.blog.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/data': ''
        }
      },
      '/upload': {
        target: 'https://sm.ms',
        changeOrigin: true,
        pathRewrite: {
          '^/upload': ''
        }
      }
    }
  },
  /*
  configureWebpack: {
    externals: {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
    }
  }
  */
}