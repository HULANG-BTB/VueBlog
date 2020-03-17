module.exports = {
  devServer: {
    proxy: {
      '/data': {
        target: 'https://server.oibit.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/data': ''
        }
      }
    }
  }
}