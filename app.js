const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
require('dotenv').config();
const cors = require("cors");
const app = express();
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;

app.use(bodyParser.json());
app.use(cors()); // cors before routes
app.use("/api", indexRouter);

const mongoURI =MONGODB_URI_PROD;

mongoose
    .connect(mongoURI)
    .then(() => {
    console.log("mongoose connected");
    })
    .catch((err) => {console.log("DB connection fail", err);

});

app.listen(process.env.PORT || 5002, () => {
    console.log("server is on");
});