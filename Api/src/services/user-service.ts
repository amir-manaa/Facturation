import { Model } from 'sequelize';
import { HttpException } from '@exceptions';
import { HTTP_RESPONSE_CODE, APP_ERROR_MESSAGE} from '@constants';
import { Security } from '@utils/security';
import { RequestValidator } from '@utils/request-validator';
import { User } from "@models/user";
import { IUser } from '@interfaces/*';

export class UserService {

  private static async checkIfUserExists(email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email }});
    return user ? true : false;
  }

  static async create(props: Partial<IUser>): Promise<Model<IUser>> {
    const { email, name, phone, address, password } = props;
    const userExists = await this.checkIfUserExists(email);
    if (userExists) {
      throw new HttpException(HTTP_RESPONSE_CODE.BAD_REQUEST_400, APP_ERROR_MESSAGE.userAlreadyExists)
    }
    const hashPassword = await Security.hashPassword(password);
    const createdUser = await User.create({
      email,
      name,
      phone,
      address,
      password: hashPassword
    });
    return createdUser;
  }

  static async authticateUser(props: Partial<IUser>) {
    const { email, password } = props;
    const validEmail = RequestValidator.isEmail(email);
    if (!validEmail) {
      throw new HttpException(HTTP_RESPONSE_CODE.BAD_REQUEST_400, APP_ERROR_MESSAGE.invalidEmail);
    }
    const user: Model<IUser> = await User.findOne({
      where: { email: email }
    });
    if (!user) {
      throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND_404, APP_ERROR_MESSAGE.userDoesntExist);
    }
    const validatePassword = await Security.matchPassword(password, user['password']);
    if (!validatePassword) {
      throw new HttpException(HTTP_RESPONSE_CODE.BAD_REQUEST_400, APP_ERROR_MESSAGE.invalidCredentials);
    }
    const isMatchedPassword = await Security.matchPassword(password, user['password']);
    if (!isMatchedPassword) {
      throw new HttpException(HTTP_RESPONSE_CODE.BAD_REQUEST_400, APP_ERROR_MESSAGE.invalidCredentials);
    }
    const accessToken = Security.generateAccessToken(email, user['role']);
    return {...user.toJSON(), accessToken}
  }

  static async getUserById(id: string): Promise<Model<IUser>> {
    if (!id) {
      throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND_404, APP_ERROR_MESSAGE.serverError_500);
    }
    const user = await User.findByPk(Number(id));
    if (!user) {
      throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND_404, APP_ERROR_MESSAGE.userDoesntExist);
    }
    return user
  }

  static async getUserByEmail(email: string): Promise<Model<IUser>> {
    const user = await User.findOne({ where: { email }});
    if (!user) {
      throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND_404, APP_ERROR_MESSAGE.userDoesntExist);
    }
    return user;
  }

  static async getUsers(): Promise<Model<IUser>[]> {
    const users = await User.findAll();
    if (!users) {
      throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND_404, APP_ERROR_MESSAGE.userDoesntExist);
    }
    return users;
  }

  static async deleteUser(id: string): Promise<number> {
    const user = User.findOne({ where: { id: Number(id) }});
    if (!user) {
      throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND_404, APP_ERROR_MESSAGE.userDoesntExist);
    }
    const deletedUser = User.destroy({ where: { id: Number(id) }});
    return deletedUser;
  }

  static async updateUser(id: string, props: Partial<IUser>): Promise<[number]> {
    const user = await User.findByPk(Number(id));
    if (!user) {
      throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND_404, APP_ERROR_MESSAGE.userDoesntExist);
    }
    const { email, name, phone, address, password, role } = props;
    const updateUser = User.update({
      email,
      name,
      phone,
      address,
      password,
      role
    }, { where: { id : Number(id) }});
    if (!updateUser) {
      throw new HttpException(HTTP_RESPONSE_CODE.BAD_REQUEST_400, APP_ERROR_MESSAGE.serverError_500);
    }
    return updateUser;
  }

}