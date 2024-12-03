import { Router } from "express";
import { __Router } from "../../types";
import { body } from "express-validator";
import { fitController } from "../../controllers/fitController/fit";
import { validatereq } from "../../middlewares/validateReq";
import { Auth } from "../../middlewares/auth";

class DeleteFitClass implements __Router {
  path = "/fitclasses/delete_class";
  router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.delete(
      `${this.path}`,
      Auth,
      [
        body("classId")
          .isMongoId()
          .withMessage("classId must be valid mongodb id."),
      ],
      validatereq,
      fitController.delete_class
    );
  }
}

export default DeleteFitClass;
