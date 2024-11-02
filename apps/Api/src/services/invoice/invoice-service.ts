import { Model } from 'sequelize';
import { HttpException } from '../../exceptions';
import { HTTP_RESPONSE_CODE, APP_ERROR_MESSAGE } from '../../constants';
import { Invoice, InvoiceItem } from '../../models';
import { IInvoice } from '../../shared/interfaces';

export class InvoiceService {
  static async create(props: Omit<IInvoice, 'id'>): Promise<Model<IInvoice>> {
    const { totalNoTax, total, status } = props;
    const createdInvoice = await Invoice.create({
      totalNoTax,
      total,
      status,
    });
    return createdInvoice;
  }

  static async getInvoiceById(id: string): Promise<Model<IInvoice>> {
    if (!id) {
      throw new HttpException(
        HTTP_RESPONSE_CODE.NOT_FOUND_404,
        APP_ERROR_MESSAGE.serverError_500
      );
    }
    const invoice = await Invoice.findByPk(parseInt(id), {
      include: [
        {
          model: InvoiceItem,
          required: false,
        },
      ],
    });
    if (!invoice) {
      throw new HttpException(
        HTTP_RESPONSE_CODE.NOT_FOUND_404,
        APP_ERROR_MESSAGE.userDoesntExist
      );
    }
    return invoice;
  }

  static async getInvoicesByUser(userId: string): Promise<Model<IInvoice>[]> {
    if (!userId) {
      throw new HttpException(
        HTTP_RESPONSE_CODE.NOT_FOUND_404,
        APP_ERROR_MESSAGE.serverError_500
      );
    }
    const invoices = await Invoice.findAll({
      where: { userId: parseInt(userId) },
    });
    if (!invoices) {
      throw new HttpException(
        HTTP_RESPONSE_CODE.NOT_FOUND_404,
        APP_ERROR_MESSAGE.userDoesntExist
      );
    }
    return invoices;
  }

  static async getInvoices(): Promise<Model<IInvoice>[]> {
    const invoices = await Invoice.findAll();
    if (!invoices) {
      throw new HttpException(
        HTTP_RESPONSE_CODE.NOT_FOUND_404,
        APP_ERROR_MESSAGE.userDoesntExist
      );
    }
    return invoices;
  }

  static async deleteInvoice(id: string): Promise<number> {
    const invoice = Invoice.findOne({ where: { id: parseInt(id) } });
    if (!invoice) {
      throw new HttpException(
        HTTP_RESPONSE_CODE.NOT_FOUND_404,
        APP_ERROR_MESSAGE.userDoesntExist
      );
    }
    const deletedInvoice = Invoice.destroy({ where: { id: parseInt(id) } });
    return deletedInvoice;
  }

  static async updateInvoice(
    id: string,
    props: Omit<IInvoice, 'id'>
  ): Promise<[number]> {
    const invoice = await Invoice.findByPk(parseInt(id));
    if (!invoice) {
      throw new HttpException(
        HTTP_RESPONSE_CODE.NOT_FOUND_404,
        APP_ERROR_MESSAGE.userDoesntExist
      );
    }
    const { totalNoTax, total, status } = props;
    const updateInvoice = Invoice.update(
      {
        totalNoTax,
        total,
        status,
      },
      { where: { id: parseInt(id) } }
    );
    if (!updateInvoice) {
      throw new HttpException(
        HTTP_RESPONSE_CODE.BAD_REQUEST_400,
        APP_ERROR_MESSAGE.serverError_500
      );
    }
    return updateInvoice;
  }
}
