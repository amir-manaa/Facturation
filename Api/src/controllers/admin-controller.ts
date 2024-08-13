import * as express from "express";
import { RequestValidator } from "@utils";
import { AdminService } from "@services"
import { IAdmin } from "@interfaces";
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE } from "@constants";
import { isAuth } from "@middleware";

export class AdminController {
  #path = "/api/v1/admins";
  #router = express.Router();
  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.#router.post(this.#path, isAuth, this.#createAdmin);
    this.#router.get(this.#path, isAuth, this.#getAdmins);
    this.#router.get(this.#path, isAuth, this.#getAdminByEmail);
    this.#router.post(this.#path, this.#authticateUser);
    this.#router.get(`${this.#path}/:id`, isAuth, this.#getAdminById);
    this.#router.delete(`${this.#path}/:id`, isAuth, this.#deleteAdmin);
    this.#router.put(`${this.#path}/:id`, isAuth, this.#updateAdmin);
  }

  get routers() {
    return this.#router;
  }

  async #createAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const reqBody = req.body as Omit<IAdmin, "id">;
      const error = RequestValidator.validUserRequest(reqBody);
      if (Object.keys(error).length) {
        return res.status(HTTP_RESPONSE_CODE.BAD_REQUEST_400).json({ error })
      }
      const admin = await AdminService.create(reqBody);
      const userToJson = admin.toJSON();
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

  async #getAdmins(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const admins = await AdminService.getAdmins();
      return res.status(HTTP_RESPONSE_CODE.SUCCESS_200).json(
        RequestValidator.createAPIResponse(
          true,
          HTTP_RESPONSE_CODE.SUCCESS_200,
          APP_ERROR_MESSAGE.usersReturned,
          admins
        )
      )
    } catch (error) {
      next(error)
    }
  }

  async #getAdminByEmail(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const reqBody = req.body as IAdmin;
      const error = RequestValidator.validUserRequest(reqBody);
      if (Object.keys(error).length) {
        return res.status(HTTP_RESPONSE_CODE.BAD_REQUEST_400).json({ error })
      }
      const email: string = req.body.email;
      const admin = await AdminService.getAdminByEmail(email);
      return res.status(HTTP_RESPONSE_CODE.SUCCESS_200).json(
        RequestValidator.createAPIResponse(
          true,
          HTTP_RESPONSE_CODE.SUCCESS_200,
          APP_ERROR_MESSAGE.userReturned,
          admin
        )
      )
    } catch (error) {
      next(error)
    }
  }

  async #authticateUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const reqBody = req.body as Pick<IAdmin, "email" | "password">;
      const error = RequestValidator.validUserRequest(reqBody);
      if (Object.keys(error).length) {
        return res.status(HTTP_RESPONSE_CODE.BAD_REQUEST_400).json({ error })
      }
      const adminAuth = await AdminService.authticateAdmin(reqBody);
      return res.status(HTTP_RESPONSE_CODE.SUCCESS_200).json(
        RequestValidator.createAPIResponse(
          true,
          HTTP_RESPONSE_CODE.SUCCESS_200,
          APP_ERROR_MESSAGE.userAuthenticated,
          adminAuth
        )
      )
    } catch (error) {
      next(error)
    }
  }

  async #getAdminById(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const id = req.params.id;
      const admin = await AdminService.getAdminById(id);
      return res.status(HTTP_RESPONSE_CODE.SUCCESS_200).json(
        RequestValidator.createAPIResponse(
          true,
          HTTP_RESPONSE_CODE.SUCCESS_200,
          APP_ERROR_MESSAGE.userReturned,
          admin
        )
      )
    } catch (error) {
      next(error)
    }
  }

  async #deleteAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const id = req.params.id;
      const admin = await AdminService.deleteAdmin(id);
      return res.status(HTTP_RESPONSE_CODE.SUCCESS_200).json(
        RequestValidator.createAPIResponse(
          true,
          HTTP_RESPONSE_CODE.SUCCESS_200,
          APP_ERROR_MESSAGE.usersDeleted,
          admin
        )
      )
    } catch (error) {
      next(error);
    }
  }

  async #updateAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const reqBody = req.body as Omit<IAdmin, "id" | "password">;
      const error = RequestValidator.validUserRequest(reqBody);
      if (Object.keys(error).length) {
        return res.status(HTTP_RESPONSE_CODE.BAD_REQUEST_400).json({ error })
      }
      const id = req.params.id;
      const admin = AdminService.updateAdmin(id, reqBody);
      return res.status(HTTP_RESPONSE_CODE.SUCCESS_200).json(
        RequestValidator.createAPIResponse(
          true,
          HTTP_RESPONSE_CODE.SUCCESS_200,
          APP_ERROR_MESSAGE.userReturned,
          admin
        )
      )
    } catch(error) {
      next(error)
    }
  }
}