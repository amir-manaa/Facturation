import * as express from 'express';
import { RequestValidator } from '../utils';
import { CustomerService } from '../services/customer-service';
import { ICustomer } from '../shared/interfaces';
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE } from '../constants';
import { isAuth } from '../middleware';

export class CustomerController {
  #path = '/api/v1';
  #router = express.Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.#router.get(`${this.#path}/customer/:id`, isAuth, this.#getCustomerById);
    this.#router.get(`${this.#path}/customer`, isAuth, this.#getCustomerByName);
    this.#router.get(`${this.#path}/customers`, isAuth, this.#getCustomers);
    this.#router.post(`${this.#path}/customer`, isAuth, this.#createCustomer);
    this.#router.put(`${this.#path}/customer/:id`, isAuth, this.#updateCustomer);
    this.#router.delete(`${this.#path}/customer/:id`, isAuth, this.#deleteCustomer);
  }

  get routers() {
    return this.#router;
  }

  async #getCustomerById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const id = req.params.id;
      const customer = await CustomerService.getCustomerById(id);
      return res
        .status(HTTP_RESPONSE_CODE.SUCCESS_200)
        .json(
          RequestValidator.createAPIResponse(
            true,
            HTTP_RESPONSE_CODE.SUCCESS_200,
            APP_ERROR_MESSAGE.userReturned,
            customer
          )
        );
    } catch (error) {
      next(error);
    }
  }

  async #getCustomerByName(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const name: string = req.body.name;
      const customer = await CustomerService.getUserByName(name);
      return res
        .status(HTTP_RESPONSE_CODE.SUCCESS_200)
        .json(
          RequestValidator.createAPIResponse(
            true,
            HTTP_RESPONSE_CODE.SUCCESS_200,
            APP_ERROR_MESSAGE.userReturned,
            customer
          )
        );
    } catch (error) {
      next(error);
    }
  }

  async #getCustomers(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const customers = await CustomerService.getCustomers();
      return res
        .status(HTTP_RESPONSE_CODE.SUCCESS_200)
        .json(
          RequestValidator.createAPIResponse(
            true,
            HTTP_RESPONSE_CODE.SUCCESS_200,
            APP_ERROR_MESSAGE.usersReturned,
            customers
          )
        );
    } catch (error) {
      next(error);
    }
  }

  async #createCustomer(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const reqBody = req.body as Omit<ICustomer, 'id' | 'role'>;
      /************************************************
        Form Customer Email is not Mandatory, so no validUserRequest
       ***********************************************/
      /*
      const error = RequestValidator.validUserRequest(reqBody);
      if (Object.keys(error).length) {
        return res.status(HTTP_RESPONSE_CODE.BAD_REQUEST_400).json({ error });
      }*/
      const customer = await CustomerService.create(reqBody);
      return res
        .status(HTTP_RESPONSE_CODE.CREATED_201)
        .json(
          RequestValidator.createAPIResponse(
            true,
            HTTP_RESPONSE_CODE.CREATED_201,
            APP_ERROR_MESSAGE.createdUser_201,
            customer
          )
        );
    } catch (error) {
      next(error);
    }
  }

  async #updateCustomer(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const reqBody = req.body as Omit<ICustomer, 'id'>;
      const error = RequestValidator.validUserRequest(reqBody);
      if (Object.keys(error).length) {
        return res.status(HTTP_RESPONSE_CODE.BAD_REQUEST_400).json({ error });
      }
      const id = req.params.id;
      const customer = CustomerService.updateCustomer(id, reqBody);
      return res
        .status(HTTP_RESPONSE_CODE.SUCCESS_200)
        .json(
          RequestValidator.createAPIResponse(
            true,
            HTTP_RESPONSE_CODE.SUCCESS_200,
            APP_ERROR_MESSAGE.userReturned,
            customer
          )
        );
    } catch (error) {
      next(error);
    }
  }

  async #deleteCustomer(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const id = req.params.id;
      const customer = await CustomerService.deleteUCustomer(id);
      return res
        .status(HTTP_RESPONSE_CODE.SUCCESS_200)
        .json(
          RequestValidator.createAPIResponse(
            true,
            HTTP_RESPONSE_CODE.SUCCESS_200,
            APP_ERROR_MESSAGE.usersDeleted,
            customer
          )
        );
    } catch (error) {
      next(error);
    }
  }
}
