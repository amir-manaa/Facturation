import express from 'express';
import bodyParser from 'body-parser';

import { sequelize } from '@utils/db';

const port = process.env.APP_PORT;

// models
import { User } from "@models/user";
import { Invoice } from "@models/invoice/invoice";
import { Admin } from "@models/admin";
import { InvoiceItem } from "@models/invoice/invoice-item";

// router
import * as routes from '@routes';

// middleware
import { isAuth } from '@middleware/is-auth';

const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: false }));

Invoice.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Invoice);

InvoiceItem.belongsTo(Invoice, { constraints: true, onDelete: "CASCADE" });
Invoice.hasMany(InvoiceItem);

// Dashboard
app.use("/api/v1/dashboard/login", routes.authAdminRouter);
app.use("/api/v1/dashboard/admin", isAuth, routes.adminRouter);

// Authentification
app.use("/api/v1/login", routes.authUserRouter);

// User
app.use("/api/v1/user", isAuth, routes.userRouter);

// Invoice
app.use("/api/v1/invoice", isAuth, routes.invoiceRouter);
app.use("/api/v1/invoiceItem", isAuth, routes.invoiceItemRouter);


app.use("/", routes.errorRouter);

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
