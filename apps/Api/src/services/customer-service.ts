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
    const { email, name, phone, address } = props;
    const customerExists = await this.checkIfUserExists(name);
    if (customerExists) {
      throw new HttpException(
        HTTP_RESPONSE_CODE.BAD_REQUEST_400,
        APP_ERROR_MESSAGE.userAlreadyExists
      );
    }
    const createdCustomer = await Customer.create({
      email,
      name,
      phone,
      address
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
    const customer = await Customer.findByPk(parseInt(id));
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

  static async getCustomers(): Promise<Model<ICustomer>[]> {
    const customers = await Customer.findAll({order: [['updatedAt', 'DESC']]});
    if (!customers) {
      throw new HttpException(
        HTTP_RESPONSE_CODE.NOT_FOUND_404,
        APP_ERROR_MESSAGE.userDoesntExist
      );
    }
    return customers;
  }

  static async deleteUCustomer(id: string): Promise<number> {
    const customer = Customer.findOne({ where: { id: parseInt(id) } });
    if (!customer) {
      throw new HttpException(
        HTTP_RESPONSE_CODE.NOT_FOUND_404,
        APP_ERROR_MESSAGE.userDoesntExist
      );
    }
    const deletedCustomer = Customer.destroy({ where: { id: parseInt(id) } });
    return deletedCustomer;
  }

  static async updateCustomer(
    id: string,
    props: Omit<ICustomer, 'id'>
  ): Promise<[number]> {
    const customer = await Customer.findByPk(parseInt(id));
    if (!customer) {
      throw new HttpException(
        HTTP_RESPONSE_CODE.NOT_FOUND_404,
        APP_ERROR_MESSAGE.userDoesntExist
      );
    }
    const { email, name, phone, address, role } = props;
    const updateCustomer = Customer.update(
      {
        email,
        name,
        phone,
        address,
        role,
      },
      { where: { id: parseInt(id) } }
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
