const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = createProxyMiddleware({

    target: process.env.STOCK_SERVICE,

    changeOrigin: true,

    onProxyReq: (proxyReq, req, res) => {
        console.log("========== Proxy Request in stock Service =========");
        console.log("Method :", req.method);
        console.log("URL    :", req.originalUrl);
        console.log("Target :", process.env.USER_SERVICE);
        console.log("Headers:", req.headers);
        console.log("===================================");
    },

    onProxyRes: (proxyRes, req, res) => {
        console.log("========== Proxy Response in stock Service =========");
        console.log("Method      :", req.method);
        console.log("URL         :", req.originalUrl);
        console.log("Status Code :", proxyRes.statusCode);
        console.log("Headers     :", proxyRes.headers);
        console.log("===================================");
    },

    onError: (err, req, res, next) => {
        console.error("========== Proxy Error in stock Service ==========");
        console.error(err);
        console.error("=================================");
        next(err);
    },
});