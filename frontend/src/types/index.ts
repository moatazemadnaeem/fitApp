import { store } from "../store";

//General Types

type strAndNull = string | null;
type boolAndNull = boolean | null;

//Store Types

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Fitness Classes types
export interface fitClassBase {
  title: string;
  description: string;
  maxAttendees: number;
  startDate: Date;
  attendingUsers: string[];
  timePeriod: Date;
  _id: string;
}
export interface fitClassInter {
  classes: fitClassBase[] | [];
  loading: boolean;
  status: boolAndNull;
  error: string;
}
export interface fitClassReadInter {
  fitclasses: fitClassBase[] | [];
  msg: string;
  status: boolean;
}
export interface BodyIdInter {
  classId: string;
}
export interface BookResInter {
  msg: string;
  status: boolean;
  classBooked: fitClassBase;
}
export type Page = number;
// User Types

type userBase = {
  name: string;
  email: string;
} | null;

export interface userInter {
  user: userBase;
  token: strAndNull;
  status: boolAndNull;
  loading: boolean;
  error: string;
  currLoading: boolean;
}
export interface userResInter {
  name: string;
  email: string;
  token: strAndNull;
  status: boolAndNull;
}

export interface UserSignInInter {
  name: string;
  email: string;
}

export interface UserSignUpInter {
  name: string;
  email: string;
  password: string;
}

export interface UserCurrInter {
  name: string;
  email: string;
  status: boolAndNull;
}
