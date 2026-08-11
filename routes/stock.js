const express = require("express");

const auth = require("../middleware/auth");

const proxy = require("../services/stockProxy");

const router = express.Router();

router.use(auth);

router.use("/", proxy);

module.exports = router;
