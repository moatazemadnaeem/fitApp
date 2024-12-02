import { NextFunction, Request, Response } from "express";
import { CustomError } from "../error_classes/customError";
export const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).send(err.summary());
  } else {
    res.status(400).send([{ msg: err.message }]);
  }
};
