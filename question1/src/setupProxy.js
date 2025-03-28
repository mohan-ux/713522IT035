const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/test',
    createProxyMiddleware({
      target: 'http://localhost:9876',
      changeOrigin: true,
      pathRewrite: {
        '^/test': '/test',
      },
      onProxyReq: (proxyReq) => {
        proxyReq.setHeader('Accept', 'application/json');
      },
      onError: (err, req, res) => {
        console.error('Proxy Error:', err);
        res.status(500).send('Proxy Error');
      },
    })
  );
}; 