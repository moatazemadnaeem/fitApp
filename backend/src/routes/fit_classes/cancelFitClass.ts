import { Router } from "express";
import { __Router } from "../../types";
import { body } from "express-validator";
import { fitController } from "../../controllers/fitController/fit";
import { validatereq } from "../../middlewares/validateReq";
import { Auth } from "../../middlewares/auth";

class CancelFitClass implements __Router {
  path = "/fitclasses/cancel_class";
  router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      `${this.path}`,
      Auth,
      [
        body("classId")
          .isMongoId()
          .withMessage("classId must be valid mongodb id."),
      ],
      validatereq,
      fitController.cancel_book_class
    );
  }
}

export default CancelFitClass;
