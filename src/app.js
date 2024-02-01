const express = require("express");
const app = express();
const path = require("path");
app.set("port", process.env.PORT || 3000); //dynamic port 
// dynamic port wont work since isn't defined on .env file 
const intialPath = path.join(__dirname, "public");
//app.use(bodyParser.json());
//app.use(express.static(intialPath));
app.get("/", (req, res) => {
  res.sendFile(path.join(intialPath, "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(intialPath, "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(intialPath, "register.html"));
});

app.post("/register-user", (req, res) => {
  const { name, email, password } = req.body;

  if (!name.length || !email.length || !password.length) {
    res.json("fill all the fields first");
  } else {
    db("patients")
      .insert({
        name: name,
        email: email,
        password: password,
      })
      .returning(["name", "email"])
      .then((data) => {
        res.json(data[0]);
      })
      .catch((err) => {
        if (err.detail.includes("already exists")) {
          res.json("email already exists");
        }
      });
  }
});

app.post("/login-user", (req, res) => {
  const { email, password } = req.body;

  db.select("name", "email")
    .from("users")
    .where({
      email: email,
      password: password,
    })
    .then((data) => {
      if (data.length) {
        res.json(data[0]);
      } else {
        res.json("email or password is incorrect");
      }
    });
});

app.listen(3000, (req, res) => {
  console.log("listening on port 3000......");
});
