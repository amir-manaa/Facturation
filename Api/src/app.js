const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/db");
const port = process.env.APP_PORT;

const Customer = require("./models/customer");
const Invoice = require("./models/invoice/invoice");
const Admin = require("./models/admin");
const InvoiceItem = require("./models/invoice/invoice-item");

const adminRouter = require("./routes/admin");
const customerRouter = require("./routes/customer");
const invoiceRouter = require("./routes/invoice/invoice");
const invoiceItemRouter = require("./routes/invoice/invoice-item");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

Invoice.belongsTo(Customer, { constraints: true, onDelete: "CASCADE" });
Customer.hasMany(Invoice);

InvoiceItem.belongsTo(Invoice, { constraints: true, onDelete: "CASCADE" });
Invoice.hasMany(InvoiceItem);

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/customer", customerRouter);
app.use("/api/v1/invoice", invoiceRouter);
app.use("/api/v1/invoiceItem", invoiceItemRouter);

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
