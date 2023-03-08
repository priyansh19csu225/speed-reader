const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(
        createProxyMiddleware('/insert', {
            target: 'http://localhost:9000',
            secure: false,
        }),
    );
};