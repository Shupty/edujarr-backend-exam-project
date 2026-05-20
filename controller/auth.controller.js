const userModel = require("../model/user.model");
const { apiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.registrationController = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // hash ur pass...

  const hash = await bcrypt.hash(password, 12);

  const user = new userModel({
    name,
    email,
    password: hash,
  });
  await user.save();
  apiResponse(res, 201, "user created successfullly", user);
});

exports.loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const findUser = await userModel.findOne({ email }).select("+password");
  if (!findUser) {
    apiResponse(res, 401, "Invalid Credential");
  } else {
    //  pass check
    const passwordCheck = await bcrypt.compare(password, findUser.password);
    if (passwordCheck) {
      const user = {
        _id: findUser._id,
        email: findUser.email,
        name: findUser.name,
        role: findUser.role,
      };

      const accesstoken = jwt.sign(user, process.env.PRIVATE_KEY, {
        expiresIn: "1h",
      });

      res.cookie("accesstoken", accesstoken, { maxAge: 3600000 });

      apiResponse(res, 200, "login successfull", user);
    } else {
      apiResponse(res, 401, "Invalid Credential");
    }
  }
});

exports.allUsersController = asyncHandler(async (req, res) => {

  //  console.log(req.session);
  const users = await userModel
    .find({})
    .sort({ createdAt: -1 });
  apiResponse(res, 200, "user fetched successfully", users);
});