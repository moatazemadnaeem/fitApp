import { CustomError } from "./customError";
export class BadReqErr extends CustomError {
  statusCode = 400;
  constructor(public msg: string) {
    super(msg);
    Object.setPrototypeOf(this, BadReqErr.prototype);
  }
  summary() {
    return [{ msg: this.msg }];
  }
}
