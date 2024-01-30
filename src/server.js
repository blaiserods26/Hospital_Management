const { connectDB } = require("./db/conn.js");
const dotenv = require("dotenv");
dotenv.config();
connectDB();
