import { Response } from "express";
import User from "../../models/userModel";
import FitClasses from "../../models/fitnessModel";
import { BadReqErr } from "../../error_classes/badReqError";
import { currRequest } from "../../types";
import { NotFound } from "../../error_classes/notFoundError";
import convertStrToObjID from "../../utils/convertStrToObjectId";
import { NotAuth } from "../../error_classes/notAuthError";
import _ from "lodash";

class FitController {
  public async create_class(req: currRequest, res: Response) {
    try {
      const userId = req.currentUser?.id;
      const user = await User.findById(userId);
      if (!user) {
        throw new NotFound("this user can not be found!");
      }
      await FitClasses.create({
        userId,
        ...req.body,
      });
      res.status(201).send({
        status: true,
        msg: "Fitness class Created Successfully.",
      });
    } catch (error: any) {
      throw new BadReqErr(error.message);
    }
  }
  public async read_classes(req: currRequest, res: Response) {
    try {
      const page = req.body.page || 1;
      const limit = page * 10;
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const fitclasses = await FitClasses.find({
        startDate: { $gte: now },
      }).limit(limit);
      res.send({
        msg: "Done sending all fitness classes",
        fitclasses,
        status: true,
      });
    } catch (error: any) {
      throw new BadReqErr(error.message);
    }
  }
  public async edit_class(req: currRequest, res: Response) {
    try {
      const { classId } = req.body;
      const { title, description, startDate, timePeriod, maxAttendees } =
        req.body;
      const body = {
        title,
        description,
        startDate,
        timePeriod,
        maxAttendees,
      };
      const filteredBody = _.omitBy(body, _.isUndefined);
      const userId = req.currentUser?.id;
      const classfound = await FitClasses.findById(classId);
      if (!classfound) {
        throw new NotFound("this fitness class can not be found");
      }
      if (classfound.userId.toString() !== userId) {
        throw new NotAuth("You can not edit class that not yours");
      }
      if (classfound.attendingUsers.length > maxAttendees) {
        throw new NotAuth("maxAttendees must be bigger than attending users");
      }
      const updatePortion = { ...classfound.toObject(), ...filteredBody };
      const updatedFitClass = await FitClasses.findOneAndUpdate(
        {
          _id: classId,
        },
        { $set: updatePortion },
        { new: true }
      );
      res.send({
        msg: "Done updating fitness class",
        status: true,
        updatedFitClass,
      });
    } catch (error: any) {
      throw new BadReqErr(error.message);
    }
  }
  public async delete_class(req: currRequest, res: Response) {
    try {
      const { classId } = req.body;
      const userId = req.currentUser?.id;
      const classfound = await FitClasses.findById(classId);
      if (!classfound) {
        throw new NotFound("this fitness class can not be found");
      }
      if (classfound.userId.toString() !== userId) {
        throw new NotAuth("You can not delete class that not yours");
      }
      const deletedFitClass = await FitClasses.findOneAndDelete({
        _id: classId,
      });
      if (!deletedFitClass) {
        throw new NotFound("this fit class can not be found");
      }
      res.send({
        msg: "Done deleting fitness class",
        status: true,
        deletedFitClass,
      });
    } catch (error: any) {
      throw new BadReqErr(error.message);
    }
  }
  public async book_class(req: currRequest, res: Response) {
    try {
      const { classId } = req.body;
      const userId = req.currentUser!.id;
      const classFound = await FitClasses.findById(classId);
      if (!classFound) {
        throw new BadReqErr("Class can not be found");
      }
      if (classFound.attendingUsers.length === classFound.maxAttendees) {
        throw new BadReqErr("Can not book the class becauseits full");
      }

      const FitClassNoUser = await FitClasses.find({
        _id: classId,
        attendingUsers: { $in: userId },
      });
      if (FitClassNoUser[0]) {
        throw new BadReqErr(
          "Can not book the class because you already booked it"
        );
      }
      if (classFound.userId.toString() === userId) {
        throw new BadReqErr(
          "You can not book yourself you are the owner of this class"
        );
      }
      classFound.attendingUsers.push(convertStrToObjID(userId));
      await classFound.save();
      res.send({
        msg: "Done Booking the class",
        status: true,
        classBooked: classFound,
      });
    } catch (error: any) {
      throw new BadReqErr(error.message);
    }
  }
  public async cancel_book_class(req: currRequest, res: Response) {
    try {
      const { classId } = req.body;
      const userId = req.currentUser!.id;
      const classFound = await FitClasses.findById(classId);
      if (!classFound) {
        throw new BadReqErr("Class can not be found");
      }
      const FitClassNoUser = await FitClasses.find({
        _id: classId,
        attendingUsers: { $in: userId },
      });
      if (!FitClassNoUser[0]) {
        throw new BadReqErr(
          "You can not cancel the class because you did not book it"
        );
      }

      const attUsers = classFound.attendingUsers.filter(
        (att) => att.toString() !== userId
      );
      classFound.attendingUsers = attUsers;
      await classFound.save();
      res.send({
        msg: "Done Canceling the class",
        status: true,
        classCanceled: classFound,
      });
    } catch (error: any) {
      throw new BadReqErr(error.message);
    }
  }
  public async get_booked_classes(req: currRequest, res: Response) {
    try {
      const page = req.body.page || 1;
      const id = req.currentUser?.id;
      const limit = page * 10;
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const fitclasses = await FitClasses.find({
        timePeriod: { $gte: now },
        attendingUsers: { $in: [id] },
      }).limit(limit);
      res.send({
        msg: "Done sending all booked fitness classes",
        fitclasses,
        status: true,
      });
    } catch (error: any) {
      throw new BadReqErr(error.message);
    }
  }
  public async get_created_classes(req: currRequest, res: Response) {
    try {
      const page = req.body.page || 1;
      const userId = req.currentUser?.id;
      const limit = page * 10;
      const fitclasses = await FitClasses.find({
        userId,
      }).limit(limit);
      res.send({
        msg: "Done sending all booked fitness classes",
        fitclasses,
        status: true,
      });
    } catch (error: any) {
      throw new BadReqErr(error.message);
    }
  }
}

export const fitController = new FitController();
