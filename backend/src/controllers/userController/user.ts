import { Request, Response } from "express";
import User from "../../models/userModel";
import { BadReqErr } from "../../error_classes/badReqError";
import { hashPass, comparePass } from "../../utils/passowrd";
import jwt from "jsonwebtoken";
import { currRequest } from "../../types";
import { NotFound } from "../../error_classes/notFoundError";
import _ from "lodash";
class UserController {
  public async create_user(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const exists = await User.findOne({ email });
      if (exists) {
        throw new BadReqErr("Email is already in use");
      }
      await User.create({
        name,
        email,
        password: hashPass(password),
      });

      res.status(201).send({
        status: true,
        msg: "User Created Successfully.",
      });
    } catch (error: any) {
      throw new BadReqErr(error.message);
    }
  }
  public async signIn_user(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      //if user does not exist
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        throw new BadReqErr("invalid creds can not find user ");
      }
      //check password
      const validate = comparePass(password, existingUser.password);
      if (!validate) {
        throw new BadReqErr("invalid creds  error in password");
      }
      const token = jwt.sign(
        {
          id: existingUser._id,
        },
        process.env.JWT_KEY!,
        { expiresIn: "1d" }
      );
      req.session = {
        jwt: token,
      };
      res.status(200).send({
        name: existingUser.name,
        email: existingUser.email,
        token,
        status: true,
        msg: "Done Signing In.",
      });
    } catch (error: any) {
      throw new BadReqErr(error.message);
    }
  }
  public async signout(req: Request, res: Response) {
    req.session = null;
    res.send({
      token: null,
      currentUser: null,
    });
  }
  public async current(req: currRequest, res: Response) {
    if (req.currentUser) {
      try {
        const user = await User.findById(req.currentUser.id);
        if (user) {
          const { name, email, _id } = user;
          res.send({
            name,
            email,
            id: _id,
            status: true,
          });
        } else {
          throw new NotFound("this user can not be found");
        }
      } catch (err: any) {
        throw new BadReqErr(err.message);
      }
    } else {
      res.send({ currentUser: null });
    }
  }
  public async edit_user(req: currRequest, res: Response) {
    try {
      const userId = req.currentUser?.id;
      const { name, password } = req.body;
      const body = { name, password };
      let filteredBody = _.omitBy(body, _.isUndefined);
      const userfound = await User.findById(userId);
      if (!userfound) {
        throw new NotFound("this user can not be found");
      }
      if (filteredBody?.password) {
        filteredBody = {
          ...filteredBody,
          password: hashPass(filteredBody?.password),
        };
      }
      const updatePortion = { ...userfound.toObject(), ...filteredBody };
      await User.findOneAndUpdate(
        {
          _id: userId,
        },
        { $set: updatePortion },
        { new: true }
      );
      res.send({
        msg: "Done updating the user",
        status: true,
      });
    } catch (error: any) {
      throw new BadReqErr(error.message);
    }
  }
}
export const userController = new UserController();
