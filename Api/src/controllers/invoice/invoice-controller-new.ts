import * as express from "express";
import { RequestValidator } from "@utils/request-validator";
import { InvoiceService } from "@services/invoice/invoice-service"; 
import { IInvoice } from "@interfaces/*";
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE } from "@constants";

export class InvoiceController {
  path = "/api/v1/invoices";
  router = express.Router()
  constructor() {
    this.initRoutes()
  }

  private initRoutes() {
    this.router.post(this.path, this.createInvoice);
    this.router.get(`${this.path}/:id`, this.getInvoiceById);
    this.router.get(`${this.path}/:userId`, this.getInvoicesByUser);
    this.router.get(this.path, this.getInvoices);
    this.router.delete(`${this.path}/:id`, this.deleteInvoice);
    this.router.put(`${this.path}/:id`, this.updateInvoice);
  }

  private async createInvoice(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const reqBody = req.body as Omit<IInvoice, "id">;
      const error = RequestValidator.validUserRequest(reqBody);
      if (Object.keys(error).length) {
        return res.status(HTTP_RESPONSE_CODE.BAD_REQUEST_400).json({ error })
      }
      const invoice = await InvoiceService.create(reqBody);
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

  private async getInvoiceById(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const invoiceId = req.params.id;
      const invoice = await InvoiceService.getInvoiceById(invoiceId);
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

  private async getInvoicesByUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const userId = req.params.userId;
      const invoices = await InvoiceService.getInvoicesByUser(userId);
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

  private async getInvoices(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const invoices = await InvoiceService.getInvoices();
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

  private async deleteInvoice(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const invoiceId = req.params.id;
      const deletedInvoice = await InvoiceService.deleteInvoice(invoiceId);
      return res.status(HTTP_RESPONSE_CODE.CREATED_201).json(
        RequestValidator.createAPIResponse(
          true,
          HTTP_RESPONSE_CODE.CREATED_201,
          APP_ERROR_MESSAGE.createdUser_201,
          { deletedInvoice }
        )
      )
    } catch (error) {
      next(error);
    }
  }

  private async updateInvoice(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const invoiceId = req.params.id;
      const reqBody = req.body as Omit<IInvoice, "id">;

      const updatedInvoice = await InvoiceService.updateInvoice(invoiceId, reqBody);
      return res.status(HTTP_RESPONSE_CODE.CREATED_201).json(
        RequestValidator.createAPIResponse(
          true,
          HTTP_RESPONSE_CODE.CREATED_201,
          APP_ERROR_MESSAGE.createdUser_201,
          { updatedInvoice }
        )
      )
    } catch (error) {
      next(error);
    }
  }
}