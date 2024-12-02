import { Router } from "express";
import { __Router } from "../../types";
import { userController } from "../../controllers/userController/user";
class SignOut implements __Router {
  path = "/users/signout";
  router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}`, userController.signout);
  }
}

export default SignOut;
