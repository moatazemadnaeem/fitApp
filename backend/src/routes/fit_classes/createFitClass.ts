import { Router } from "express";
import { __Router } from "../../types";
import { body } from "express-validator";
import { fitController } from "../../controllers/fitController/fit";
import { validatereq } from "../../middlewares/validateReq";
import { Auth } from "../../middlewares/auth";

class CreateFitClass implements __Router {
  path = "/fitclasses/create_class";
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
    this.router.post(
      `${this.path}`,
      Auth,
      [
        body("title")
          .trim()
          .isLength({ min: 3, max: 255 })
          .withMessage("title must be at least 3 chars long and 255 max"),
        body("description")
          .trim()
          .isLength({ min: 3 })
          .withMessage("description must be at least 3 chars long"),
        body("startDate")
          .isISO8601()
          .withMessage("startDate must be a valid date ex:YYYY-MM-DD")
          .custom((value) => {
            const inputDate = new Date(value);
            const currentDate = new Date();
            inputDate.setHours(0, 0, 0, 0);
            currentDate.setHours(0, 0, 0, 0);
            if (inputDate < currentDate) {
              throw new Error(
                "startDate must be greater than the current date"
              );
            }
            return true;
          }),
        body("timePeriod")
          .isISO8601()
          .withMessage("timePeriod must be a valid date ex:YYYY-MM-DD")
          .custom((value, { req }) => {
            const endDate = new Date(value);
            const startDate = new Date(req.body.startDate);
            endDate.setHours(0, 0, 0, 0);
            startDate.setHours(0, 0, 0, 0);
            if (endDate < startDate) {
              throw new Error(
                "timePeriod must be greater or equal than the start date date"
              );
            }
            return true;
          }),
        body("maxAttendees")
          .exists()
          .withMessage("maxAttendees must exist")
          .custom(this.checkMaxAttendees),
      ],
      validatereq,
      fitController.create_class
    );
  }
}

export default CreateFitClass;
