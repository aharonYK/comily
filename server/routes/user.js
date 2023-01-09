const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const mongoose = require("mongoose");
const router = express();
const jwt = require("jsonwebtoken");
const { User, validate } = require("../models/user");

//get all users
router.get("/", async (req, res) => {
  const users = await User.find().select("-_id -__v");
  res.send(users);
});

//get user by id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
    console.log(user)
  } catch (error) {
    return res.status(400).send(error.message);
  }
});


//add user
router.post("/", async (req, res) => {
  const body = req.body;
  const { email, password } = body;
  const { error } = validate(body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email });
  if (user) return res.status(400).send("user already exsist");

  user = new User(_.pick(body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  try {
    user = await user.save();

    res
      .header("x-auth-token", user.generateJWT())
      .header("access-control-expose-headers", "x-auth-token")
      .send(_.pick(user, ["name", "email"]));
  } catch (err) {
    res.status(500).send("somethong went wrong");
  }
});

module.exports = router;
