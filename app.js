const express = require("express");

const morgan = require("morgan");

const security = require("./middleware/security");

// const limiter = require("./middleware/rateLimiter");

// const gateway = require("./routes/gateway");

const app = express();

security(app);

app.use(morgan("dev"));

// app.use(limiter);

// app.use("/users", gateway);

// app.use(express.json());

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error in User Api Gatway';
})

module.exports = app;