import * as express from "express";
import { RequestValidator } from "@utils/request-validator";
import { UserService } from "@services/user-service";
import { IUser } from "@interfaces/*";
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE } from "@constants";

export class UserController {
  path = "/api/v1/users";
  router = express.Router();
  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.post(this.path, this.createUser);
    this.router.get(this.path, this.getUsers);
    this.router.get(this.path, this.getUserByEmail);
    this.router.post(`${this.path}/auth`, this.authticateUser);
    this.router.get(`${this.path}/:id`, this.getUserById);
    this.router.delete(`${this.path}/:id`, this.deleteUser);
    this.router.put(`${this.path}/:id`, this.updateUser);
  }

  private async createUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const reqBody = req.body as Omit<IUser, "id">;
      const error = RequestValidator.validUserRequest(reqBody);
      if (Object.keys(error).length) {
        return res.status(HTTP_RESPONSE_CODE.BAD_REQUEST_400).json({ error })
      }
      const user = await UserService.create(reqBody);
      const userToJson = user.toJSON();
      return res.status(HTTP_RESPONSE_CODE.CREATED_201).json(
        RequestValidator.createAPIResponse(
          true,
          HTTP_RESPONSE_CODE.CREATED_201,
          APP_ERROR_MESSAGE.createdUser_201,
          { userToJson }
        )
      )
    } catch (error) {
      next(error);
    }
  }

  private async getUsers(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const users = await UserService.getUsers();
      return res.status(HTTP_RESPONSE_CODE.SUCCESS_200).json(
        RequestValidator.createAPIResponse(
          true,
          HTTP_RESPONSE_CODE.SUCCESS_200,
          APP_ERROR_MESSAGE.usersReturned,
          users
        )
      )
    } catch (error) {
      next(error)
    }
  }

  private async getUserByEmail(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const reqBody = req.body as IUser;
      const error = RequestValidator.validUserRequest(reqBody);
      if (Object.keys(error).length) {
        return res.status(HTTP_RESPONSE_CODE.BAD_REQUEST_400).json({ error })
      }
      const email: string = req.body.email;
      const user = await UserService.getUserByEmail(email);
      return res.status(HTTP_RESPONSE_CODE.SUCCESS_200).json(
        RequestValidator.createAPIResponse(
          true,
          HTTP_RESPONSE_CODE.SUCCESS_200,
          APP_ERROR_MESSAGE.userReturned,
          user
        )
      )
    } catch (error) {
      next(error)
    }
  }

  private async authticateUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const reqBody = req.body as Pick<IUser, "email" | "password">;
      const error = RequestValidator.validUserRequest(reqBody);
      if (Object.keys(error).length) {
        return res.status(HTTP_RESPONSE_CODE.BAD_REQUEST_400).json({ error })
      }
      const userAuth = await UserService.authticateUser(reqBody);
      return res.status(HTTP_RESPONSE_CODE.SUCCESS_200).json(
        RequestValidator.createAPIResponse(
          true,
          HTTP_RESPONSE_CODE.SUCCESS_200,
          APP_ERROR_MESSAGE.userAuthenticated,
          userAuth
        )
      )
    } catch (error) {
      next(error)
    }
  }

  private async getUserById(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const id = req.params.id;
      const user = await UserService.getUserById(id);
      return res.status(HTTP_RESPONSE_CODE.SUCCESS_200).json(
        RequestValidator.createAPIResponse(
          true,
          HTTP_RESPONSE_CODE.SUCCESS_200,
          APP_ERROR_MESSAGE.userReturned,
          user
        )
      )
    } catch (error) {
      next(error)
    }
  }

  private async deleteUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const id = req.params.id;
      const user = await UserService.deleteUser(id);
      return res.status(HTTP_RESPONSE_CODE.SUCCESS_200).json(
        RequestValidator.createAPIResponse(
          true,
          HTTP_RESPONSE_CODE.SUCCESS_200,
          APP_ERROR_MESSAGE.usersDeleted,
          user
        )
      )
    } catch (error) {
      next(error);
    }
  }

  private async updateUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const reqBody = req.body as Omit<IUser, "id">;
      const error = RequestValidator.validUserRequest(reqBody);
      if (Object.keys(error).length) {
        return res.status(HTTP_RESPONSE_CODE.BAD_REQUEST_400).json({ error })
      }
      const id = req.params.id;
      const user = UserService.updateUser(id, reqBody);
      return res.status(HTTP_RESPONSE_CODE.SUCCESS_200).json(
        RequestValidator.createAPIResponse(
          true,
          HTTP_RESPONSE_CODE.SUCCESS_200,
          APP_ERROR_MESSAGE.userReturned,
          user
        )
      )
    } catch(error) {
      next(error)
    }
  }
}