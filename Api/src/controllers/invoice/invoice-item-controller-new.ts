import * as express from "express";
import { RequestValidator } from "@utils/request-validator";
import { InvoiceItemService } from "@services/invoice/invoice-item-service";
import { IInvoiceItem } from "@interfaces/*";
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE } from "@constants";

export class InvoiceItemController {
  path = "/api/v1/invoice-items";
  router = express.Router()
  constructor() {
    this.initRoutes()
  }

  private initRoutes() {
    this.router.post(this.path, this.createInvoiceItem);
    this.router.get(`${this.path}/:id`, this.getInvoiceItemById);
    this.router.get(`${this.path}/:invoiceId`, this.getInvoiceItems);
    this.router.delete(`${this.path}/:invoiceItemId`, this.deleteInvoiceItem);
    this.router.put(`${this.path}/:id`, this.updateInvoiceItem);
  }

  private async createInvoiceItem(req: express.Request, res: express.Response, next: express.NextFunction) {
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

  private async getInvoiceItemById(req: express.Request, res: express.Response, next: express.NextFunction) {
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

  private async getInvoiceItems(req: express.Request, res: express.Response, next: express.NextFunction) {
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

  private async deleteInvoiceItem(req: express.Request, res: express.Response, next: express.NextFunction) {
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

  private async updateInvoiceItem(req: express.Request, res: express.Response, next: express.NextFunction) {
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
}