const mongoose = require("mongoose");
//mongoose.connect("mongodb://localhost:27017");

//const MONGODB_URI = "mongodb://localhost:27017";
const connectDB = async () => {
  try {
    const con = await mongoose.connect("mongodb://localhost:27017/fortis", {
      //process.env.MONGODB_URI
      // useNewUrlParser: true,
      //useUnifiedTopology: true,
      //useFindAndModify: false,
      //useCreateIndex: true,
    });
    console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
});
module.exports = { connectDB };
