import { Model } from 'sequelize';
import { HttpException } from '@exceptions';
import { HTTP_RESPONSE_CODE, APP_ERROR_MESSAGE} from '@constants';
import { Security } from '@utils/security';
import { RequestValidator } from '@utils/request-validator';
import { Admin } from "@models/admin";
import { IAdmin } from "@interfaces/*";


export class AdminService {

  private static async checkIfAdminExists(email: string): Promise<boolean> {
    const user = await Admin.findOne({ where: { email }});
    return user ? true : false;
  }

  static async create(props: Omit<IAdmin, "id">): Promise<Model<IAdmin>> {
    const { email, name, password, role } = props;
    const userExists = await this.checkIfAdminExists(email);
    if (userExists) {
      throw new HttpException(HTTP_RESPONSE_CODE.BAD_REQUEST_400, APP_ERROR_MESSAGE.userAlreadyExists)
    }
    const hashPassword = await Security.hashPassword(password);
    const createdUser = await Admin.create({
      email,
      name,
      password: hashPassword,
      role
    });
    return createdUser;
  }

  static async authticateAdmin(props: Pick<IAdmin, "email" | "password">) {
    const { email, password } = props;
    const validEmail = RequestValidator.isEmail(email);
    if (!validEmail) {
      throw new HttpException(HTTP_RESPONSE_CODE.BAD_REQUEST_400, APP_ERROR_MESSAGE.invalidEmail);
    }
    const admin: Model<IAdmin> = await Admin.findOne({
      where: { email }
    });
    if (!admin) {
      throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND_404, APP_ERROR_MESSAGE.userDoesntExist);
    }
    const validatePassword = await Security.matchPassword(password, admin.dataValues.password);
    if (!validatePassword) {
      throw new HttpException(HTTP_RESPONSE_CODE.BAD_REQUEST_400, APP_ERROR_MESSAGE.invalidCredentials);
    }
    const isMatchedPassword = await Security.matchPassword(password, admin.dataValues.password);
    if (!isMatchedPassword) {
      throw new HttpException(HTTP_RESPONSE_CODE.BAD_REQUEST_400, APP_ERROR_MESSAGE.invalidCredentials);
    }
    const accessToken = Security.generateAccessToken(email, admin.dataValues.role);
    return {...admin.toJSON(), accessToken}
  }

  static async getAdminById(id: string): Promise<Model<IAdmin>> {
    if (!id) {
      throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND_404, APP_ERROR_MESSAGE.serverError_500);
    }
    const admin = await Admin.findByPk(Number(id));
    if (!admin) {
      throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND_404, APP_ERROR_MESSAGE.userDoesntExist);
    }
    return admin
  }

  static async getAdminByEmail(email: string): Promise<Model<IAdmin>> {
    const admin = await Admin.findOne({ where: { email }});
    if (!admin) {
      throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND_404, APP_ERROR_MESSAGE.userDoesntExist);
    }
    return admin;
  }

  static async getAdmins(): Promise<Model<IAdmin>[]> {
    const admins = await Admin.findAll();
    if (!admins) {
      throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND_404, APP_ERROR_MESSAGE.userDoesntExist);
    }
    return admins;
  }

  static async deleteAdmin(id: string): Promise<number> {
    const admin = Admin.findOne({ where: { id: Number(id) }});
    if (!admin) {
      throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND_404, APP_ERROR_MESSAGE.userDoesntExist);
    }
    const deletedAdmin = Admin.destroy({ where: { id: Number(id) }});
    return deletedAdmin;
  }

  static async updateAdmin(id: string, props: Omit<IAdmin, "id" | "password">): Promise<[number]> {
    const admin = await Admin.findByPk(Number(id));
    if (!admin) {
      throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND_404, APP_ERROR_MESSAGE.userDoesntExist);
    }
    const { email, name, role } = props;
    const updateAdmin = Admin.update({
      email,
      name,
      role
    }, { where: { id : Number(id) }});
    if (!updateAdmin) {
      throw new HttpException(HTTP_RESPONSE_CODE.BAD_REQUEST_400, APP_ERROR_MESSAGE.serverError_500);
    }
    return updateAdmin;
  }
}