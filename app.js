const express = require("express");

const morgan = require("morgan");

const cookieParser = require('cookie-parser');

const security = require("./middleware/security");

// const limiter = require("./middleware/rateLimiter");

const gateway = require("./routes/gateway");

const aiGateway = require("./routes/ai");

const stockGateway = require("./routes/stock");



const app = express();

security(app);

app.use(morgan("dev"));

app.use(cookieParser());

// app.use(limiter);

app.use("/users", gateway);

app.use("/ai", aiGateway);

app.use("/stock", stockGateway);



// app.use(express.json());

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error in User Api Gatway';
    res.status(statusCode).json({ error: message });
})

module.exports = app;