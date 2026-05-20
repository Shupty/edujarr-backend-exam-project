const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "existing mail!"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      select: false,
      minLength: [6, "password must be at least 6 characters"],
    },
    address: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
      trim: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
