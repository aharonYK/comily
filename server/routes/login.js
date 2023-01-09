const _ = require("lodash");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");
const { User } = require("../models/user");
const { validate } = require("../models/login");
const router = express.Router();

router.post("/", async (req, res) => {
  const body = req.body;
  const { email, password } = body;
  const { error } = validate(body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email });
  if (!user) return res.status(400).send("Invalid email or password.");
  let token;
  const valiedPassword = await bcrypt.compare(password, user.password);
  if (valiedPassword) token = user.generateJWT();
  token ? res.send(token) : res.status(400).send("Invalid email or password. ");
});

module.exports = router;
