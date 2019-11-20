module.exports = {
  devServer: {
    proxy: {
      '/data': {
        target: 'http://blog.cn',
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
  }
}