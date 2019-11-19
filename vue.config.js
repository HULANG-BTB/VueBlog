module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://blog.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/imgUpload': {
        target: 'https://sm.ms',
        changeOrigin: true,
        pathRewrite: {
          '^/imgUpload': ''
        }
      }
    }
  }
}