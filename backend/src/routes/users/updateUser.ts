import { Router } from "express";
import { __Router } from "../../types";
import { userController } from "../../controllers/userController/user";
import { Auth } from "../../middlewares/auth";
import { body } from "express-validator";
import { validatereq } from "../../middlewares/validateReq";
class UpdateUser implements __Router {
  path = "/users/edit_user";
  router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.patch(
      `${this.path}`,
      Auth,
      [
        body("name")
          .optional()
          .trim()
          .isLength({ min: 3, max: 255 })
          .withMessage("name must be at least 3 chars long and 255 max"),
        body("password")
          .optional()
          .trim()
          .isLength({ min: 6, max: 255 })
          .withMessage("Password must be at least 6 chars long and 255 max"),
      ],
      validatereq,
      userController.edit_user
    );
  }
}

export default UpdateUser;
