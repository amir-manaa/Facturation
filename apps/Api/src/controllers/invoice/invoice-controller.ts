import * as express from 'express';
import { RequestValidator } from '../../utils';
import { InvoiceService } from '../../services';
import { IInvoice } from '../../shared/interfaces';
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE } from '../../constants';
import { isAuth } from '../../middleware';

export class InvoiceController {
  #path = '/api/v1';
  #router = express.Router();

  constructor() {
    this.#initRoutes();
  }

  #initRoutes() {
    this.#router.get(`${this.#path}/invoice/:id`, isAuth, this.#getInvoiceById);
    this.#router.get(
      `${this.#path}/invoice/:userId`,
      isAuth,
      this.#getInvoicesByUser
    );
    this.#router.get(`${this.#path}/invoices`, isAuth, this.#getInvoices);
    this.#router.post(`${this.#path}/invoice`, isAuth, this.#createInvoice);
    this.#router.put(`${this.#path}/invoice/:id`, isAuth, this.#updateInvoice);
    this.#router.delete(
      `${this.#path}invoice/:id`,
      isAuth,
      this.#deleteInvoice
    );
  }

  get routers() {
    return this.#router;
  }

  async #getInvoiceById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const invoiceId = req.params.id;
      const invoice = await InvoiceService.getInvoiceById(invoiceId);
      return res
        .status(HTTP_RESPONSE_CODE.CREATED_201)
        .json(
          RequestValidator.createAPIResponse(
            true,
            HTTP_RESPONSE_CODE.CREATED_201,
            APP_ERROR_MESSAGE.createdUser_201,
            { invoice }
          )
        );
    } catch (error) {
      next(error);
    }
  }

  async #getInvoicesByUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const userId = req.params.userId;
      const invoices = await InvoiceService.getInvoicesByUser(userId);
      return res
        .status(HTTP_RESPONSE_CODE.CREATED_201)
        .json(
          RequestValidator.createAPIResponse(
            true,
            HTTP_RESPONSE_CODE.CREATED_201,
            APP_ERROR_MESSAGE.createdUser_201,
            { invoices }
          )
        );
    } catch (error) {
      next(error);
    }
  }

  async #getInvoices(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const invoices = await InvoiceService.getInvoices();
      return res
        .status(HTTP_RESPONSE_CODE.CREATED_201)
        .json(
          RequestValidator.createAPIResponse(
            true,
            HTTP_RESPONSE_CODE.CREATED_201,
            APP_ERROR_MESSAGE.createdUser_201,
            { invoices }
          )
        );
    } catch (error) {
      next(error);
    }
  }

  async #createInvoice(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const reqBody = req.body as Omit<IInvoice, 'id'>;
      const error = RequestValidator.validUserRequest(reqBody);
      if (Object.keys(error).length) {
        return res.status(HTTP_RESPONSE_CODE.BAD_REQUEST_400).json({ error });
      }
      const invoice = await InvoiceService.create(reqBody);
      return res
        .status(HTTP_RESPONSE_CODE.CREATED_201)
        .json(
          RequestValidator.createAPIResponse(
            true,
            HTTP_RESPONSE_CODE.CREATED_201,
            APP_ERROR_MESSAGE.createdUser_201,
            { invoice }
          )
        );
    } catch (error) {
      next(error);
    }
  }

  async #updateInvoice(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const invoiceId = req.params.id;
      const reqBody = req.body as Omit<IInvoice, 'id'>;

      const updatedInvoice = await InvoiceService.updateInvoice(
        invoiceId,
        reqBody
      );
      return res
        .status(HTTP_RESPONSE_CODE.CREATED_201)
        .json(
          RequestValidator.createAPIResponse(
            true,
            HTTP_RESPONSE_CODE.CREATED_201,
            APP_ERROR_MESSAGE.createdUser_201,
            { updatedInvoice }
          )
        );
    } catch (error) {
      next(error);
    }
  }

  async #deleteInvoice(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const invoiceId = req.params.id;
      const deletedInvoice = await InvoiceService.deleteInvoice(invoiceId);
      return res
        .status(HTTP_RESPONSE_CODE.CREATED_201)
        .json(
          RequestValidator.createAPIResponse(
            true,
            HTTP_RESPONSE_CODE.CREATED_201,
            APP_ERROR_MESSAGE.createdUser_201,
            { deletedInvoice }
          )
        );
    } catch (error) {
      next(error);
    }
  }
}
