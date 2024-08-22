import * as express from "express";
import { RequestValidator } from "../utils";
import { AdminService } from "../services"
import { IAdmin } from "../shared/interfaces";
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE } from "../constants";
import { isAuth, isAdmin } from "../middleware";

export class AdminController {
  #path = "/api/v1";
  #router = express.Router();
  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.#router.get(`${this.#path}/admin/:id`, isAuth, isAdmin, this.#getAdminById);
    this.#router.get(`${this.#path}/admin`, isAuth, isAdmin, this.#getAdminByEmail);
    this.#router.get(`${this.#path}/admins`, isAuth, isAdmin, this.#getAdmins);
    this.#router.post(`${this.#path}/admin`, isAuth, isAdmin, this.#createAdmin);
    this.#router.post(`${this.#path}/admin/auth`, this.#authenticateAdmin);
    this.#router.put(`${this.#path}/admin/:id`, isAuth, isAdmin, this.#updateAdmin);
    this.#router.delete(`${this.#path}/admin/:id`, isAuth, isAdmin, this.#deleteAdmin);
  }

  get routers() {
    return this.#router;
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

  async #authenticateAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const reqBody = req.body as Pick<IAdmin, "email" | "password">;
      const error = RequestValidator.validUserRequest(reqBody);
      if (Object.keys(error).length) {
        return res.status(HTTP_RESPONSE_CODE.BAD_REQUEST_400).json({ error })
      }
      const adminAuth = await AdminService.authenticateAdmin(reqBody);
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
}