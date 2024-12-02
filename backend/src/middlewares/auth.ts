import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { NotAuth } from "../error_classes/notAuthError";
import { userPayload, currRequest } from "../types";
export const Auth = async (
  req: currRequest,
  __: Response,
  next: NextFunction
) => {
  if (req.headers.authentication || req.body.authentication) {
    try {
      const authentication = req.headers.authentication
        ? req.headers.authentication
        : req.body.authentication;
      const payload = jwt.verify(
        authentication,
        process.env.JWT_KEY!
      ) as userPayload;
      req.currentUser = payload;
    } catch (err) {
      return next(new NotAuth("You are not authenticated"));
    }

    return next();
  }
  if (!req.session?.jwt) {
    return next(new NotAuth("You are not authenticated"));
  }
  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as userPayload;
    req.currentUser = payload;
  } catch (err) {
    return next(new NotAuth("You are not authenticated"));
  }

  return next();
};
