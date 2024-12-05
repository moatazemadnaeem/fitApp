import { Router } from "express";
import { __Router } from "../../types";
import { body } from "express-validator";
import { fitController } from "../../controllers/fitController/fit";
import { validatereq } from "../../middlewares/validateReq";
import { Auth } from "../../middlewares/auth";

class GetCreatedFitClasses implements __Router {
  path = "/fitclasses/get_created_classes";
  router = Router();

  constructor() {
    this.initializeRoutes();
  }
  private checkPage(value: any) {
    if (!Number.isInteger(value)) {
      throw new Error("Page must be valid integer.");
    }
    if (value < 1) {
      throw new Error("Page must not be less than one.");
    }
    return true;
  }
  private initializeRoutes(): void {
    this.router.post(
      `${this.path}`,
      Auth,
      [
        body("page")
          .exists()
          .withMessage("page must exist")
          .bail()
          .custom(this.checkPage),
      ],
      validatereq,
      fitController.get_created_classes
    );
  }
}

export default GetCreatedFitClasses;
