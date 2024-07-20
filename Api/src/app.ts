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
import { adminRouter } from "@routes/admin";
import { userRouter } from "@routes/user";
import { invoiceRouter } from "@routes/invoice/invoice";
import { invoiceItemRouter } from "@routes/invoice/invoice-item";
import { authAdminRouter } from "@routes/auth/authAdmin";
import { authUserRouter } from '@routes/auth/authUser';
import { errorRouter } from '@routes/error';


import { isAuth } from '@middleware/is-auth';

const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: false }));

Invoice.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Invoice);

InvoiceItem.belongsTo(Invoice, { constraints: true, onDelete: "CASCADE" });
Invoice.hasMany(InvoiceItem);

// Dashboard
app.use("/api/v1/dashboard/login", authAdminRouter);
app.use("/api/v1/dashboard/admin", isAuth, adminRouter);

// Authentification
app.use("/api/v1/login", authUserRouter);

// User
app.use("/api/v1/user", isAuth, userRouter);

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
