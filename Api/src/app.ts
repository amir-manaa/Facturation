import express from 'express';
import bodyParser from 'body-parser';

import { sequelize } from './utils/db';

const port = process.env.APP_PORT;

// models
import { Customer } from "./models/customer";
import { Invoice } from "./models/invoice/invoice";
import { Admin } from "./models/admin";
import { InvoiceItem } from "./models/invoice/invoice-item";

// router
import { adminRouter } from "./routes/admin";
import { customerRouter } from "./routes/customer";
import { invoiceRouter } from "./routes/invoice/invoice";
import { invoiceItemRouter } from "./routes/invoice/invoice-item";
import { authAdminRouter } from "./routes/auth/authAdmin";
import { authCustomerRouter } from './routes/auth/authCustomer';
import { errorRouter } from './routes/error';


import { isAuth } from './middleware/is-auth';

const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: false }));

Invoice.belongsTo(Customer, { constraints: true, onDelete: "CASCADE" });
Customer.hasMany(Invoice);

InvoiceItem.belongsTo(Invoice, { constraints: true, onDelete: "CASCADE" });
Invoice.hasMany(InvoiceItem);

// Dashboard
app.use("/api/v1/dashboard/login", authAdminRouter);
app.use("/api/v1/dashboard/admin", isAuth, adminRouter);

// Authentification
app.use("/api/v1/login", authCustomerRouter);

// Customer
app.use("/api/v1/customer", isAuth, customerRouter);

// Invoice
app.use("/api/v1/invoice", isAuth, invoiceRouter);
app.use("/api/v1/invoiceItem", isAuth, invoiceItemRouter);


app.use("/", errorRouter);

sequelize
  .sync()
  // .sync({ force: true })
  .then((result) => {
    // console.log(result);
    app.listen(port);
  })
  .catch((error) => {
    console.log(error);
  });
