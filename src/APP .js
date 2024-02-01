const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
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
});
