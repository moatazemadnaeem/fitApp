import { ValidationError } from "express-validator";
import { CustomError } from "./customError";
export class ValidateInComingReq extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super("something goes wrong with creds");
    Object.setPrototypeOf(this, ValidateInComingReq.prototype);
  }

  summary() {
    return this.errors.map((err) => {
      return { msg: err.msg };
    });
  }
}
