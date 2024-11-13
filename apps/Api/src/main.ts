import { App } from './app';
import * as controllers from './controllers';

const app = new App(
  [
    new controllers.UserController(),
    new controllers.AdminController(),
    new controllers.InvoiceController(),
    new controllers.InvoiceItemController(),
    new controllers.CustomerController(),
  ],
  parseInt(process.env.APP_PORT)
);

app.listen();
