const { createProxyMiddleware, fixRequestBody } = require("http-proxy-middleware");

module.exports = createProxyMiddleware({

    target: process.env.USER_SERVICE,

    changeOrigin: true,

    pathRewrite: {
        "^/users": ""
    },

    onError: (err, req, res, next) => {
        console.log("error in proxy", err);
        next(err);
    }
});