const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const User = require("./mongodb");
const port = 3000;
const hostname = "127.0.0.1";

app.set("view engine", "hbs");

app.use(express.static("public"));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  try {
    const check = await User.findOne({
      name: req.body.name,
      password: req.body.password,
    });
    if (check) {
      res.render("home");
      console.log("User logged in");
    } else {
      res.redirect("/");
      console.log("User not found");
    }
  } catch (error) {
    console.log(`Error: ${error}`);
  }
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  try {
    const user = {
      name: req.body.name,
      password: req.body.password,
    };

    const newUser = new User(user);
    await newUser.save();
    res.redirect("/login");
    console.log("User created");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.listen(port, hostname, () => {
  console.log(`Example app listening at http://${hostname}:${port}`);
});
