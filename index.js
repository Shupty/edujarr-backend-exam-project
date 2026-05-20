require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const app = express();
const port = process.env.PORT;

app.use(express.json());

connectDB();

app.use("/", require("./route"));

app.listen(port, "localhost", () => {
  console.log(`server is running on port ${port}`);
});
