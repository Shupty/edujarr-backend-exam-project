const express = require("express");
const router = express.Router();

//http://localhost:3000/api/v1/auth/
router.use("/auth", require("./auth"));

module.exports = router;