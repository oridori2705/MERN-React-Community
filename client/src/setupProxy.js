const { createProxyMiddleware } = require('http-proxy-middleware');
//서버포트 5000번으로보내기위해서
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};