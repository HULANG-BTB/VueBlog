module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://blog.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}