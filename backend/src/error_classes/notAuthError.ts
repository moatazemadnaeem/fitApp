import { CustomError } from "./customError";
export class NotAuth extends CustomError {
  statusCode = 401;
  constructor(public msg: string) {
    super(msg);
    Object.setPrototypeOf(this, NotAuth.prototype);
  }
  summary() {
    return [{ msg: this.msg }];
  }
}
