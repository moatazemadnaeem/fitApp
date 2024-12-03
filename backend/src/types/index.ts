import { Request } from "express";
import { Router } from "express";
import mongoose from "mongoose";

//payload types
export interface userPayload {
  id: string;
}
export interface currRequest extends Request {
  currentUser?: userPayload;
}
//router types
export interface __Router {
  path: string;
  router: Router;
}
//models
export interface UserRes extends mongoose.Document {
  name: string;
  email: string;
  password: string;
}
export interface FitRes extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  startDate: Date;
  timePeriod: Date;
  maxAttendees: number;
  attendingUsers: mongoose.Types.ObjectId[];
}
