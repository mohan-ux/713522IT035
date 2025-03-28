const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/numbers',
    createProxyMiddleware({
      target: 'http://localhost:9876',
      changeOrigin: true,
    })
  );
}; 