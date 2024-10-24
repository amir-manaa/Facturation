import { IUser } from "./user"

export interface IApiResponse {
  success: boolean,
    code: number,
    message: string,
    data: {
      user: IUser;
      accessToken: string
    }
}
