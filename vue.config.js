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
      '/imgUpload': {
        target: 'https://img.oibit.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/imgUpload': ''
        }
      }
    },
    https: true
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