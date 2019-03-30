const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParse = require("body-parser");
const morgan = require("morgan");
const chat = require("./api/chat");
//MiddleWare
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());
app.use(morgan("dev"));
app.use(cors());
//Prevent CORS And Allow PUT,POST,DELETE,PATCH,GET
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"),
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, PATCH, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/chat", chat);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Running Server at " + port));
