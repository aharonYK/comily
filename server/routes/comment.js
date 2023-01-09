const express = require("express");
const mongoose = require("mongoose");
const _ = require('lodash')
const router = express();
const { Comment, validate } = require("../models/comments");

router.get("/", async (req, res) => {
  const comments = await Comment.find().select('name message -_id');
  res.send(comments);
});

router.post("/", async (req, res) => {
  const body = req.body;

  const { error } = validate(body);
  if (error) return res.status(400).send(error.details[0].message);

  let comment = new Comment({...body});

  try {
    comment = await comment.save();
    res.send(_.pick(comment, ["name", "message"]));
  } catch (err) {
    res.status(500).send("somethong went wrong");
  }
});

module.exports = router;
