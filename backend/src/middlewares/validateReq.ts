import { validationResult } from "express-validator";
import { ValidateInComingReq } from "../error_classes/incomingReq";
import { Request, Response, NextFunction } from "express";
export const validatereq = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new ValidateInComingReq(error.array());
  }
  next();
};
