const express = require("express");
const router = express.Router();

//http://localhost:3000/api/v1
router.use(process.env.BASE_URL, require("./api"))

module.exports = router;