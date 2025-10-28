import { Model } from 'sequelize';
import * as express from 'express';
import { HttpException } from '../exceptions';
import { HTTP_RESPONSE_CODE, APP_ERROR_MESSAGE, LIST_DEFAULT_LIMIT } from '../constants';
import { Customer } from '../models';
import { ICustomer, IDecodeToken } from '../shared/interfaces';
import * as utils from '../utils';

export class CustomerService {
  private static async checkIfUserExists(name: string): Promise<boolean> {
    const customer = await Customer.findOne({ where: { name } });
    return !!customer;
  }

  static async create(req, props: Omit<ICustomer, 'id' | 'role'>): Promise<Model<ICustomer>> {
    const { name, address, phone, email } = props;
    const customerExists = await this.checkIfUserExists(name);
    if (customerExists) {
      throw new HttpException(
        HTTP_RESPONSE_CODE.BAD_REQUEST_400,
        APP_ERROR_MESSAGE.userAlreadyExists
      );
    }
    const decode: IDecodeToken = utils.Security.decodeToken(req);
    const createdCustomer = await Customer.create({
      name,
      address,
      phone,
      email,
      userId: decode.id
    });
    return createdCustomer;
  }

  static async getCustomerById(id: string): Promise<Model<ICustomer>> {
    if (!id) {
      throw new HttpException(
        HTTP_RESPONSE_CODE.NOT_FOUND_404,
        APP_ERROR_MESSAGE.serverError_500
      );
    }
    const customer = await Customer.findByPk(id);
    if (!customer) {
      throw new HttpException(
        HTTP_RESPONSE_CODE.NOT_FOUND_404,
        APP_ERROR_MESSAGE.userDoesntExist
      );
    }
    return customer;
  }

  static async getCustomerByName(name: string): Promise<Model<ICustomer>> {
    const customer = await Customer.findOne({ where: { name } });
    if (!customer) {
      throw new HttpException(
        HTTP_RESPONSE_CODE.NOT_FOUND_404,
        APP_ERROR_MESSAGE.userDoesntExist
      );
    }
    return customer;
  }

  static async getCustomers(req: express.Request): Promise<{ count: number, customers: Model<ICustomer, ICustomer>[] }> {

    const params = req.query;
    console.log('back :', Number(params.limit) * Number(params.pageIndex));
    /*****************************************
      Fiter
    *****************************************/
    const filter =  {};
    filter['limit'] = Number(params.limit) || LIST_DEFAULT_LIMIT;

    if (params.pageIndex) {
      filter['offset'] = (Number(params.limit) || LIST_DEFAULT_LIMIT) * Number(params.pageIndex);
    }
    filter['order'] = [['updatedAt', 'DESC']];
    /*****************************************
     Fiter End
     *****************************************/

    /*****************************************
     Where
     *****************************************/
    const decode: IDecodeToken = utils.Security.decodeToken(req);
    filter['where'] = { userId: decode.id };
    /*****************************************
     Where End
     *****************************************/
    const { count, rows:customers } = await Customer.findAndCountAll(filter);
    if (!customers) {
      throw new HttpException(
        HTTP_RESPONSE_CODE.NOT_FOUND_404,
        APP_ERROR_MESSAGE.userDoesntExist
      );
    }
    return { count, customers };
  }

  static async deleteUCustomer(id: string): Promise<number> {
    const customer = Customer.findOne({ where: { id: id } });
    if (!customer) {
      throw new HttpException(
        HTTP_RESPONSE_CODE.NOT_FOUND_404,
        APP_ERROR_MESSAGE.userDoesntExist
      );
    }
    const deletedCustomer: Promise<number> = Customer.destroy({ where: { id: id } });
    return deletedCustomer;
  }

  static async updateCustomer(
    id: string,
    props: Omit<ICustomer, 'id' | 'role'>
  ): Promise<[number]> {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      throw new HttpException(
        HTTP_RESPONSE_CODE.NOT_FOUND_404,
        APP_ERROR_MESSAGE.userDoesntExist
      );
    }
    const { name, address, phone, email } = props;
    const updateCustomer = Customer.update(
      {
        name,
        address,
        phone,
        email
      },
      { where: { id: id } }
    );
    if (!updateCustomer) {
      throw new HttpException(
        HTTP_RESPONSE_CODE.BAD_REQUEST_400,
        APP_ERROR_MESSAGE.serverError_500
      );
    }
    return updateCustomer;
  }
}
