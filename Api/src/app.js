const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/db");
const port = process.env.APP_PORT;

const Customer = require("./models/customer");
const Bill = require("./models/bill");

const customerRouter = require("./routes/customer");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello world");
});

Bill.belongsTo(Customer, { constraints: true, onDelete: "CASCADE" });
Customer.hasMany(Bill);

app.use("/api/v1/customer", customerRouter);

sequelize
  // .sync()
  .sync({ alter: true })
  .then((result) => {
    // console.log(result);
    app.listen(port);
  })
  .catch((error) => {
    console.log(error);
  });
