require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require('path')
const userRoutes = require("./Routes/User");

// express app
const app = express();

// middleware
app.use(express.json());

app.use(express.static(path.join(__dirname, '/Assets')));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api", userRoutes);

// Connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listening for request
    app.listen(process.env.PORT, () => {
      console.log("Connected to db & listening on PORT:", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
