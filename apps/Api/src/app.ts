import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Invoice, User, InvoiceItem, Customer } from './models';
import { sequelize } from './utils';
import { errorHandlerMiddleware, get404Middleware } from './middleware';

export class App {
  #app: express.Express;
  #port: number;

  constructor(controllers: unknown, port: number) {
    this.#app = express();
    this.#coreMiddlewares();
    this.#port = port;
    this.#DbAssociation();
    this.#connectDB();
    this.#initControllers(controllers);
    this.#initialErrorHandling();
    this.#notFoundMiddleware();
  }

  #coreMiddlewares(): void {
    const corsOptions = {
      origin: 'http://localhost:4400/',
      methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type,Authorization',
    };

    this.#app.use(cors(corsOptions));
    this.#app.disable('x-powered-by'); //Reduce fingerprinting
    this.#app.use(cookieParser());
    this.#app.use(bodyParser.urlencoded({ extended: false }));
    this.#app.use(express.json());
  }

  #DbAssociation(): void {
    Customer.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
    User.hasMany(Customer);

    Invoice.belongsTo(Customer, { constraints: true, onDelete: 'CASCADE' });
    Customer.hasMany(Invoice);

    InvoiceItem.belongsTo(Invoice, { constraints: true, onDelete: 'CASCADE' });
    Invoice.hasMany(InvoiceItem);
  }

  #connectDB(): void {
    sequelize
      //.sync()
      //.sync({ force: true })
      .sync({ alter: true })
      .then((result) => {
        console.log('DB connected successfully');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  #initControllers(controllers: any): void {
    for (const controller of controllers) {
      this.#app.use('/', controller.routers);
    }
  }

  #initialErrorHandling(): void {
    this.#app.use(errorHandlerMiddleware);
  }

  #notFoundMiddleware(): void {
    this.#app.use(get404Middleware);
  }

  listen(): void {
    this.#app.listen(this.#port);
  }
}
