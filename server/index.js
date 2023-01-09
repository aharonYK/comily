const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3002;
const user = require('./routes/user')
const comment = require('./routes/comment')
const auth = require('./middlewares/auth')
const login = require('./routes/login')
mongoose.set("strictQuery", true);

mongoose
  .connect("mongodb://127.0.0.1:27017/comments")
  .then(() => console.log("Connected to Database"))
  .catch(() => console.log("Couldnt connect"));

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'))
app.use('/api/users', user)
app.use('/api/comments',auth, comment)
app.use('/api/login', login)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
