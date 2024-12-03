import { Router } from "express";
import { __Router } from "../../types";
import { body } from "express-validator";
import { fitController } from "../../controllers/fitController/fit";
import { validatereq } from "../../middlewares/validateReq";

class GetFitClasses implements __Router {
  path = "/fitclasses/get_classes";
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
      [
        body("page")
          .exists()
          .withMessage("page must exist")
          .bail()
          .custom(this.checkPage),
      ],
      validatereq,
      fitController.read_classes
    );
  }
}

export default GetFitClasses;
