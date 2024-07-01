const express = require("express");
const bodyParser = require("body-parser");

const port = process.env.APP_PORT;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port);
