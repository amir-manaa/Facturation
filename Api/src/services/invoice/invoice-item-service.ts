import { Model } from 'sequelize';
import { HttpException } from '@exceptions';
import { HTTP_RESPONSE_CODE, APP_ERROR_MESSAGE} from '@constants';
import { InvoiceItem } from "@models";
import { IInvoiceItem } from "@interfaces";

export class InvoiceItemService {

  static async create(props: Omit<IInvoiceItem, "id">): Promise<Model<IInvoiceItem>> {
    const { quantity, description, cost, invoiceId } = props;
    const createdInvoice = await InvoiceItem.create({
      quantity,
      description,
      cost,
      invoiceId
    });
    return createdInvoice;
  }

  static async getInvoiceItemById(id: string): Promise<Model<IInvoiceItem>> {
    if (!id) {
      throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND_404, APP_ERROR_MESSAGE.serverError_500);
    }
    const invoiceItem = await InvoiceItem.findByPk(parseInt(id));
    if (!invoiceItem) {
      throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND_404, APP_ERROR_MESSAGE.userDoesntExist);
    }
    return invoiceItem;
  }

  static async getInvoiceItems(invoiceId: string): Promise<Model<IInvoiceItem>[]> {
    const invoiceItems = await InvoiceItem.findAll({ where : { invoiceId: parseInt(invoiceId) }});
    if (!invoiceItems) {
      throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND_404, APP_ERROR_MESSAGE.userDoesntExist)
    }
    return invoiceItems;
  }

  static async deleteInvoiceItem(invoiceItemId: string): Promise<number> {
    const id = parseInt(invoiceItemId);
    const invoiceItem = InvoiceItem.findOne({ where: { id }});
    if (!invoiceItem) {
      throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND_404, APP_ERROR_MESSAGE.userDoesntExist);
    }
    const deletedInvoiceItem = InvoiceItem.destroy({ where: { id }});
    return deletedInvoiceItem;
  }

  static async updateInvoiceItem(invoiceItemId: string, props: Omit<IInvoiceItem, "id" | "invoiceId">): Promise<[number]> {
    const id = parseInt(invoiceItemId);
    const invoice = await InvoiceItem.findByPk(id);
    if (!invoice) {
      throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND_404, APP_ERROR_MESSAGE.userDoesntExist);
    }
    const { quantity, description, cost } = props;
    const updateInvoiceItem = InvoiceItem.update({
      quantity,
      description,
      cost
    }, { where: { id }});
    if (!updateInvoiceItem) {
      throw new HttpException(HTTP_RESPONSE_CODE.BAD_REQUEST_400, APP_ERROR_MESSAGE.serverError_500);
    }
    return updateInvoiceItem;
  }

}