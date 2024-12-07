import { Router } from "express";
import { __Router } from "../../types";
import { userController } from "../../controllers/userController/user";
import { Auth } from "../../middlewares/auth";
class SignOut implements __Router {
  path = "/users/signout";
  router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}`, Auth, userController.signout);
  }
}

export default SignOut;
