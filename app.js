const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const indexRouter = require('./routes/index');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', createProxyMiddleware({
    target: 'https://api.maxposter.ru',
    changeOrigin: true,
    logLevel: 'debug',
    pathRewrite: {
        '^/api': '/partners-api'
    }
}));

app.use('/', indexRouter);

module.exports = app;
