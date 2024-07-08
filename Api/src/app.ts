import express from 'express';
import bodyParser from 'body-parser';

import { sequelize } from './utils/db';

const port = process.env.APP_PORT;

import { Customer } from "./models/customer";
import { Invoice } from "./models/invoice/invoice";
import { Admin } from "./models/admin";
import { InvoiceItem } from "./models/invoice/invoice-item";

import { adminRouter } from "./routes/admin";
import { customerRouter } from "./routes/customer";
import { invoiceRouter } from "./routes/invoice/invoice";
import { invoiceItemRouter } from "./routes/invoice/invoice-item";

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
