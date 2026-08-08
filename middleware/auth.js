const jwt = require("jsonwebtoken");

const PublicUrl = ['/register']

module.exports = (req, res, next) => {
    try {
        const token = req.cookies?.accessToken;
        console.log('token :: ', token);

        if (PublicUrl.includes(req.path)) {
            return next();
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized',
            });
        }

        // 2. Access Token वेरीफाई करें
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        // 3. Downstream Microservices के लिए यूजर की जानकारी Headers में इन्जेक्ट करें
        // ताकि दूसरी माइक्रोसर्विसेज़ को सीधे `req.headers['x-user-id']` से यूजर की डिटेल्स मिल जाएँ
        req.headers['x-user-id'] = decoded.userId;
        // req.headers['x-user-role'] = decoded.role;
        console.log("decoded :: ",  decoded,  req.headers['x-user-id']);


        next(); 
    } catch (error) {
        console.error('Gateway Auth Error:', error.message);
        return res.status(401).json({
            success: false,
            message: 'Token is invalid or has expired',
        });
    }

};