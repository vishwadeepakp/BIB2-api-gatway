const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
// const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");

module.exports = (app) => {

    app.use(helmet());

    app.use(cors({
        origin: (origin, callback) => {
            const allowedOrigins = (process.env.CORS_ORIGIN || "*")
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean);

            if (!origin || allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(null, false);
        },
        credentials: true
    }));

    app.use(compression());

    app.use(hpp());

    // app.use(mongoSanitize());

    app.disable("x-powered-by");

};