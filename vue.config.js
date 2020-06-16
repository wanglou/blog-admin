module.exports = {
  publicPath:'./',
  devServer: {
    // 设置主机地址
    host: '0.0.0.0',
    // 设置默认端口
    port: 8000,
    // 设置代理
    proxy: {
      '/': {
        // 目标 API 地址
        target: 'http://127.0.0.1:7001',
        // 如果要代理 websockets
        ws: false,
        // 将主机标头的原点更改为目标URL
        changeOrigin: false
      }
    }
  },
  lintOnSave: true,   // eslint 验证
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ]
};