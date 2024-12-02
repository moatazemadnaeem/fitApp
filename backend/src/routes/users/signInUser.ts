import { Router } from "express";
import { __Router } from "../../types";
import { body } from "express-validator";
import { userController } from "../../controllers/userController/user";
import { validatereq } from "../../middlewares/validateReq";
class SignIn implements __Router {
  path = "/users/signin";
  router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      `${this.path}`,
      [
        body("email").isEmail().withMessage("Email must be valid"),
        body("password")
          .trim()
          .isLength({ min: 6, max: 255 })
          .withMessage("Password must be at least 6 chars long and 255 max"),
      ],
      validatereq,
      userController.signIn_user
    );
  }
}

export default SignIn;
