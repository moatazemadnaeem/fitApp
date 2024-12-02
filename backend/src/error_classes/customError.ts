export abstract class CustomError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  abstract statusCode: number;

  abstract summary(): { msg: string }[];
}
