require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 3000;

app.get("/", (req, res)=>{
    res.send("Getway is alive")
}); 

app.listen(PORT, '0.0.0.0', () => {

    console.log(`🚀 API Gateway running on port ${PORT}`);

});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception thrown:', error);
});