const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/db");
const port = process.env.APP_PORT;

const Customer = require("./models/customer");
const Bill = require("./models/bill");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello world");
});

Bill.belongsTo(Customer, { constraints: true, onDelete: "CASCADE" });
Customer.hasMany(Bill);

sequelize
  .sync()
  // .sync({ alter: true })
  .then((result) => {
    // console.log(result);
    app.listen(port);
  })
  .catch((error) => {
    console.log(error);
  });
