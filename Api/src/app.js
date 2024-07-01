const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/db");
const port = process.env.APP_PORT;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello world");
});

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(port);
  })
  .catch((error) => {
    console.log(error);
  });
