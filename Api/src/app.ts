import express from 'express';
import bodyParser from 'body-parser';
import { sequelize } from '@utils';
import { errorHandlerMiddleware, get404Middleware } from '@middleware';

export class App {

  #app: express.Express;
  #port: number;

  constructor(controllers: unknown, port: number) {
    this.#app = express();
    this.#coreMiddlewares();
    this.#port = port;
    this.#connectDB();
    this.#initControllers(controllers);
    this.#initialErrorHandling();
    this.#notFoundMiddleware();
  }

  #coreMiddlewares() {
    this.#app.use(bodyParser.urlencoded({ extended: false }));
  }

  #connectDB() {
    sequelize
      .sync()
      // .sync({ force: true })
      .then((result) => {
        console.log("DB connected successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  #initControllers(controllers: any) {
    for (const controller of controllers) {
      this.#app.use('/', controller.routers)
    }
  }

  #initialErrorHandling() {
    this.#app.use(errorHandlerMiddleware);
  }

  #notFoundMiddleware() {
    this.#app.use(get404Middleware);
  }

   listen() {
    this.#app.listen(this.#port);
  }
}