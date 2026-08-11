require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Getway is alive")
});

app.get('/api/warmup', async (req, res) => {
    // दोनों Render Microservices को एक साथ जघाने के लिए Parallel Call
    Promise.allSettled([
        fetch(process.env.EMAIL_SERVICE),
        fetch(process.env.STOCK_SERVICE)
    ]);

    // UI/Frontend को तुरंत रिस्पॉन्स दो ताकि वो वेट न करे
    return res.status(200).json({
        success: true,
        message: 'Warmup signal sent to both services!'
    });
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception thrown:', error);
});

module.exports = app;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`🚀 API Gateway running on port ${PORT}`);
    });
}