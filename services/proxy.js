const { createProxyMiddleware, fixRequestBody } = require("http-proxy-middleware");

module.exports = createProxyMiddleware({

    target: process.env.USER_SERVICE,

    changeOrigin: true,

    // pathRewrite: {
    //     "^/": "/users/"
    // },

    proxyTimeout: 5000, // Set the timeout to 5 seconds

    timeout: 5000, // Set the timeout to 10 seconds

 
onProxyReq: (proxyReq, req, res) => {
        console.log("========== Proxy Request in Users Service ==========");
        console.log("Method :", req.method);
        console.log("URL    :", req.originalUrl);
        console.log("Target :", process.env.USER_SERVICE);
        console.log("Headers:", req.headers);
        console.log("===================================");
    },

    onProxyRes: (proxyRes, req, res) => {
        console.log("========== Proxy Response in Users Service =========");
        console.log("Method      :", req.method);
        console.log("URL         :", req.originalUrl);
        console.log("Status Code :", proxyRes.statusCode);
        console.log("Headers     :", proxyRes.headers);
        console.log("===================================");
    },

    onError: (err, req, res, next) => {
        console.error("========== Proxy Error in Users Service ==========");
        console.error(err);
        console.error("=================================");
        next(err);
    },
});