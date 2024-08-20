import * as express from "express";
import { RequestValidator } from "@utils";
import { InvoiceItemService } from "@services";
import { IInvoiceItem } from "@interfaces";
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE } from "@constants";
import { isAuth } from "@middleware";

export class InvoiceItemController {
  #path = "/api/v1";
  #router = express.Router()
  constructor() {
    this.initRoutes()
  }

  private initRoutes() {
    this.#router.get(`${this.#path}/invoice-item/:id`, isAuth, this.#getInvoiceItemById);
    this.#router.get(`${this.#path}/invoice-items/:invoiceId`, isAuth, this.#getInvoiceItems);
    this.#router.post(`${this.#path}/invoice-item`, isAuth, this.#createInvoiceItem);
    this.#router.put(`${this.#path}/invoice-item/:id`, isAuth, this.#updateInvoiceItem);
    this.#router.delete(`${this.#path}/invoice-item/:invoiceItemId`, isAuth, this.#deleteInvoiceItem);
  }

  get routers() {
    return this.#router;
  }

  async #getInvoiceItemById(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const invoiceItemId = req.params.id;
      const invoiceItem = await InvoiceItemService.getInvoiceItemById(invoiceItemId);
      return res.status(HTTP_RESPONSE_CODE.CREATED_201).json(
        RequestValidator.createAPIResponse(
          true,
          HTTP_RESPONSE_CODE.CREATED_201,
          APP_ERROR_MESSAGE.createdUser_201,
          { invoiceItem }
        )
      )
    } catch (error) {
      next(error);
    }
  }

  async #getInvoiceItems(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const invoiceId = req.params.invoiceId;
      const invoices = await InvoiceItemService.getInvoiceItems(invoiceId);
      return res.status(HTTP_RESPONSE_CODE.CREATED_201).json(
        RequestValidator.createAPIResponse(
          true,
          HTTP_RESPONSE_CODE.CREATED_201,
          APP_ERROR_MESSAGE.createdUser_201,
          { invoices }
        )
      )
    } catch (error) {
      next(error);
    }
  }

  async #createInvoiceItem(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const reqBody = req.body as Omit<IInvoiceItem, "id">;
      const error = RequestValidator.validUserRequest(reqBody);
      if (Object.keys(error).length) {
        return res.status(HTTP_RESPONSE_CODE.BAD_REQUEST_400).json({ error })
      }
      const invoice = await InvoiceItemService.create(reqBody);
      return res.status(HTTP_RESPONSE_CODE.CREATED_201).json(
        RequestValidator.createAPIResponse(
          true,
          HTTP_RESPONSE_CODE.CREATED_201,
          APP_ERROR_MESSAGE.createdUser_201,
          { invoice }
        )
      )
    } catch (error) {
      next(error);
    }
  }

  async #updateInvoiceItem(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const reqBody = req.body as Omit<IInvoiceItem, "id">;
      const error = RequestValidator.validUserRequest(reqBody);
      if (Object.keys(error).length) {
        return res.status(HTTP_RESPONSE_CODE.BAD_REQUEST_400).json({ error })
      }

      const invoiceItemId = req.params.invoiceItemId;
      const updatedInvoideItem = await InvoiceItemService.updateInvoiceItem(invoiceItemId, reqBody);
      return res.status(HTTP_RESPONSE_CODE.CREATED_201).json(
        RequestValidator.createAPIResponse(
          true,
          HTTP_RESPONSE_CODE.CREATED_201,
          APP_ERROR_MESSAGE.createdUser_201,
          { updatedInvoideItem }
        )
      )
    } catch (error) {
      next(error);
    }
  }

  async #deleteInvoiceItem(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const invoiceItemId = req.params.invoiceItemId;
      const invoices = await InvoiceItemService.deleteInvoiceItem(invoiceItemId);
      return res.status(HTTP_RESPONSE_CODE.CREATED_201).json(
        RequestValidator.createAPIResponse(
          true,
          HTTP_RESPONSE_CODE.CREATED_201,
          APP_ERROR_MESSAGE.createdUser_201,
          { invoices }
        )
      )
    } catch (error) {
      next(error);
    }
  }
}