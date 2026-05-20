const { default: mongoose } = require("mongoose");


const connectDB = async () => {
    mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("db connected")
  }).catch((err)=>{
    console.error(err.message)
  })
};

module.exports = connectDB;