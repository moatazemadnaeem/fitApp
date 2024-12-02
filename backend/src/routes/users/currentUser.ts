import { Router } from "express";
import { __Router } from "../../types";
import { userController } from "../../controllers/userController/user";
import { Auth } from "../../middlewares/auth";
class CurrentUser implements __Router {
  path = "/users/current_user";
  router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}`, Auth, userController.current);
  }
}

export default CurrentUser;
