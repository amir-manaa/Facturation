import { Role } from "../shared/enums";
import { APP_ERROR_MESSAGE } from '../constants';

interface IError {
  body?: string;
  email?: string;
  password?: string;
  role?: string;
}

export class RequestValidator {

  static isEmail(prop: string): boolean {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return prop.match(regex) ? true : false
  }

  static validUserRequest(prop): IError {
    const error: IError = {};
    if (!Object.keys(prop).length) {
      error.body = APP_ERROR_MESSAGE.emptyReqBody;
      return error;
    }
    Object.entries(prop).forEach(([key, value]) => {
      if (key === "email" && !this.isEmail(value as string)) {
        error.email = APP_ERROR_MESSAGE.invalidEmail;
      }
      if (key === "password" && (value as string).length < 5) {
        error.password = APP_ERROR_MESSAGE.invalidPassword;
      }

      if (key === "role" && value !== Role ) {
        error.role = "Provide a valid role";
      }
    });
    return error;
  }

  static createAPIResponse(
    success: boolean,
    code: number,
    message: string,
    data: any
  ) {
    return {
      success,
      code,
      message,
      data
    };
  }
}
