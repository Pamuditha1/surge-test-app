const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
require("dotenv").config();

const {
  loginUser,
  registerUser,
  getUser,
  updateUser,
} = require("./controllers/user");
const auth = require("./middlewares/auth");

const db =
  process.env.NODE_ENV == "test"
    ? process.env.TEST_DB
    : process.env.MONGODB_URI;
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((err) => {
    console.log("Could not Connect to mongoDB", err);
  });

app.use(cors());
app.use(express.json());
app.use(helmet());

app.post("/api/login", loginUser);
app.post("/api/register", registerUser);
app.get("/api/user/:id", getUser);
app.put("/api/user", auth, updateUser);

const defaultPort = process.env.NODE_ENV == "test" ? 3005 : 3003;
const port = process.env.PORT || defaultPort;

const server = app.listen(port, () =>
  console.log(`Listening on port ${port} ...`)
);

module.exports = server;
