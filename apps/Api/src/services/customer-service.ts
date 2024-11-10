import { Model } from 'sequelize';
import { HttpException } from '../exceptions';
import { HTTP_RESPONSE_CODE, APP_ERROR_MESSAGE } from '../constants';
import { Customer } from '../models';
import { ICustomer } from '../shared/interfaces';

export class CustomerService {
  private static async checkIfUserExists(name: string): Promise<boolean> {
    const customer = await Customer.findOne({ where: { name } });
    return !!customer;
  }

  static async create(props: Omit<ICustomer, 'id' | 'role'>): Promise<Model<ICustomer>> {
    const { name, address, phone, email } = props;
    const customerExists = await this.checkIfUserExists(name);
    if (customerExists) {
      throw new HttpException(
        HTTP_RESPONSE_CODE.BAD_REQUEST_400,
        APP_ERROR_MESSAGE.userAlreadyExists
      );
    }
    const createdCustomer = await Customer.create({
      name,
      address,
      phone,
      email
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
    if (!Customer) {
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

  static async getCustomers(params): Promise<{ count: number, customers: Model<ICustomer, ICustomer>[] }> {
    /*****************************************
      Fiter
    *****************************************/
    const filter =  {};
    if (params.limit) {
      filter['limit'] = Number(params.limit);
    }
    if (params.pageIndex) {
      filter['offset'] = Number(params.limit) * Number(params.pageIndex);
    }
    filter['order'] = [['updatedAt', 'DESC']];
    /*****************************************
     Fiter End
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
