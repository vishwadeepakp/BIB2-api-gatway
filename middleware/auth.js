const jwt = require("jsonwebtoken");

const PublicUrl = ['/register']

module.exports = (req, res, next) => {

    if (PublicUrl.includes(req.path)) {
        return next();
    }

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {

        return res.status(401).json({
            message: "Unauthorized"
        });

    }

    try {

        req.user = jwt.verify(token, process.env.JWT_SECRET);

        next();

    } catch {

        return res.status(401).json({
            message: "Invalid Token"
        });

    }

};