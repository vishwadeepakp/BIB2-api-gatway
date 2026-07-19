const rateLimit = require("express-rate-limit");
const RedisStore = require("rate-limit-redis");
const redis = require("../config/redis");

module.exports = rateLimit({

    windowMs: 60 * 1000,

    max: 100,

    standardHeaders: true,

    legacyHeaders: false,

    store: new RedisStore({
        sendCommand: (...args) => redis.call(...args)
    }),

    message: {
        success: false,
        message: "Too many requests"
    }

});