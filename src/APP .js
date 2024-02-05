/* const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  // name: { type: String, required: true, unique: true },

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

// Compile model from schema
const User = mongoose.model("User", UserSchema);

// POST method route
app.post("/register-user", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Create a new user
    const user = new User(req.body);

    // Save it to MongoDB
    const savedUser = await user.save();

    // Send the saved user as the response
    res.json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }

  async function putinDb() {
    if (!email || !password) {
      res.json("fill all the fields first");
    } else {
      try {
        await client.connect();
        const database = client.db("fortis");
        const patient = database.collection("patient");
        const user = { name, email, password };
        const result = await patient.insertOne(user);
        res.json(result.ops[0]);
      } catch (err) {
        console.error(err);
        res.json("An error occurred");
      } finally {
        await client.close();
      }
    }
  };
});
putinDb();
app.listen(3000, () => console.log("Server started on port 3000"));
*/

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017";

// Connect to MongoDB with Mongoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Remove confirmPassword from schema if not needed for storage
});

// Compile model from schema
const User = mongoose.model("User", UserSchema);

// Use express.json() middleware to parse JSON request bodies
app.use(express.json());

// POST method route
app.post("/register-user", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json("Please fill all the required fields.");
  }

  try {
    // Create a new user
    const user = new User({ name, email, password });

    // Save it to MongoDB
    const savedUser = await user.save();

    // Send the saved user as the response
    res.json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

app.listen(3000, () => console.log("Server started on port 3000"));
