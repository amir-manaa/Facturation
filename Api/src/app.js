const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/db");
const port = process.env.APP_PORT;

const Customer = require("./models/customer");
const Invoice = require("./models/invoice");
const Admin = require("./models/admin");

const customerRouter = require("./routes/customer");
const invoiceRouter = require("./routes/invoice");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

Invoice.belongsTo(Customer, { constraints: true, onDelete: "CASCADE" });
Customer.hasMany(Invoice);

app.use("/api/v1/customer", customerRouter);
app.use("/api/v1/invoice", invoiceRouter);

sequelize
  // .sync()
  .sync({ force: true })
  .then((result) => {
    // console.log(result);
    app.listen(port);
  })
  .catch((error) => {
    console.log(error);
  });
