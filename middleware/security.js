const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
// const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");

module.exports = (app) => {

    app.use(helmet());

    app.use(cors());

    app.use(compression());

    app.use(hpp());

    // app.use(mongoSanitize());

    app.disable("x-powered-by");

};