const express = require("express");
const {
  registrationController,
  loginController,
  allUsersController,
} = require("../../controller/auth.controller");
const { authorize } = require("../../middleware/authorize");
const router = express.Router();

// localhost:3000/api/v1/auth/registration
router.post("/registration", registrationController);
router.post("/login", loginController);
router.get("/all-users", authorize, allUsersController);
module.exports = router;
