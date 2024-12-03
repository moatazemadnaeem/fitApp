import { Router } from "express";
import { __Router } from "../../types";
import { body } from "express-validator";
import { fitController } from "../../controllers/fitController/fit";
import { validatereq } from "../../middlewares/validateReq";
import { Auth } from "../../middlewares/auth";

class EditFitClass implements __Router {
  path = "/fitclasses/edit_class";
  router = Router();

  constructor() {
    this.initializeRoutes();
  }
  private checkMaxAttendees(value: any) {
    if (!Number.isInteger(value)) {
      throw new Error("Max attendees must be valid integer.");
    }
    if (value < 1) {
      throw new Error("Max attendees must not be less than one.");
    }
    return true;
  }
  private initializeRoutes(): void {
    this.router.patch(
      `${this.path}`,
      Auth,
      [
        body("classId")
          .isMongoId()
          .withMessage("classId must be valid mongodb id."),
        body("title")
          .optional()
          .trim()
          .isLength({ min: 3, max: 255 })
          .withMessage("title must be at least 3 chars long and 255 max"),
        body("description")
          .optional()
          .trim()
          .isLength({ min: 3 })
          .withMessage("description must be at least 3 chars long"),
        body("startDate")
          .optional()
          .isISO8601()
          .withMessage("startDate must be a valid date ex:YYYY-MM-DD")
          .custom((value) => {
            if (new Date(value) < new Date()) {
              throw new Error(
                "startDate must be greater than the current date"
              );
            }
            return true;
          }),
        body("timePeriod")
          .optional()
          .isISO8601()
          .withMessage("timePeriod must be a valid date ex:YYYY-MM-DD")
          .custom((value, { req }) => {
            if (value < req.body.startDate) {
              throw new Error(
                "timePeriod must be greater or equal than the start date date"
              );
            }
            return true;
          }),
        body("maxAttendees").optional().custom(this.checkMaxAttendees),
      ],
      validatereq,
      fitController.edit_class
    );
  }
}

export default EditFitClass;
