import { CustomError } from "./customError";
export class NotFound extends CustomError {
  statusCode = 404;
  constructor(public msg: string) {
    super(msg);
    Object.setPrototypeOf(this, NotFound.prototype);
  }
  summary() {
    return [{ msg: this.msg }];
  }
}
