import { Model } from 'sequelize';
import { HttpException } from '@exceptions';
import { HTTP_RESPONSE_CODE, APP_ERROR_MESSAGE} from '@constants';
import { InvoiceItem } from "@models/invoice/invoice-item";
import { IInvoiceItem } from "@interfaces/*";

export class InvoiceService {

  private static async create(props: Omit<IInvoiceItem, "id">): Promise<Model<IInvoiceItem>> {
    const { quantity, description, cost, invoiceId } = props;
    const createdInvoice = await InvoiceItem.create({
      quantity,
      description,
      cost,
      invoiceId
    });
    return createdInvoice;
  }

  private static async getInvoiceItemById(id: string): Promise<Model<IInvoiceItem>> {
    if (!id) {
      throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND_404, APP_ERROR_MESSAGE.serverError_500);
    }
    const invoiceItem = await InvoiceItem.findByPk(Number(id));
    if (!invoiceItem) {
      throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND_404, APP_ERROR_MESSAGE.userDoesntExist);
    }
    return invoiceItem;
  }

  private static async getInvoiceItems(invoiceId: string): Promise<Model<IInvoiceItem>[]> {
    const invoiceItems = await InvoiceItem.findAll({ where : { invoiceId: Number(invoiceId) }});
    if (!invoiceItems) {
      throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND_404, APP_ERROR_MESSAGE.userDoesntExist)
    }
    return invoiceItems;
  }

  private static async deleteInvoiceItem(invoiceItemId: string): Promise<number> {
    const id = Number(invoiceItemId);
    const invoiceItem = InvoiceItem.findOne({ where: { id }});
    if (!invoiceItem) {
      throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND_404, APP_ERROR_MESSAGE.userDoesntExist);
    }
    const deletedInvoiceItem = InvoiceItem.destroy({ where: { id }});
    return deletedInvoiceItem;
  }

  private static async updateInvoiceItem(invoiceId: string, props: Omit<IInvoiceItem, "id" | "invoiceId">): Promise<[number]> {
    const id = Number(invoiceId);
    const invoice = await InvoiceItem.findByPk(id);
    if (!invoice) {
      throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND_404, APP_ERROR_MESSAGE.userDoesntExist);
    }
    const { quantity, description, cost } = props;
    const updateInvoiceItem = InvoiceItem.update({
      quantity,
      description,
      cost
    }, { where: { id : Number(id) }});
    if (!updateInvoiceItem) {
      throw new HttpException(HTTP_RESPONSE_CODE.BAD_REQUEST_400, APP_ERROR_MESSAGE.serverError_500);
    }
    return updateInvoiceItem;
  }

}