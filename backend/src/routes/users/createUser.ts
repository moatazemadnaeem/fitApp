import { Router } from "express";
import { __Router } from "../../types";
import { body } from "express-validator";
import { userController } from "../../controllers/userController/user";
import { validatereq } from "../../middlewares/validateReq";
class CreateUser implements __Router {
  path = "/users/create_user";
  router = Router();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.router.post(
      `${this.path}`,
      [
        body("name")
          .trim()
          .isLength({ min: 3, max: 255 })
          .withMessage("name must be at least 3 chars long and 255 max"),
        body("email").isEmail().withMessage("Email must be valid"),
        body("password")
          .trim()
          .isLength({ min: 6, max: 255 })
          .withMessage("Password must be at least 6 chars long and 255 max"),
      ],
      validatereq,
      userController.create_user
    );
  }
}

export default CreateUser;
