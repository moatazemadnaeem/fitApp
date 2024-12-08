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
export interface fitClassEditInter {
  title: string;
  description: string;
  maxAttendees: number;
  startDate: Date;
  timePeriod: Date;
  classId: string;
}
export interface fitClassCreateInter {
  title: string;
  description: string;
  maxAttendees: number;
  startDate: Date;
  timePeriod: Date;
}
export interface fitClassCreateResInter {
  msg: string;
  status: boolean;
}
export interface fitClassEditBody {
  title: string;
  description: string;
  maxAttendees: number;
  startDate: Date;
  timePeriod: Date;
}
export interface fitClassInter {
  classes: fitClassBase[] | [];
  loading: boolean;
  status: boolAndNull;
  error: string;
  dashboard: {
    classes: fitClassBase[] | [];
    loading: boolean;
    status: boolAndNull;
    error: string;
  };
  createdClasses: {
    classes: fitClassBase[] | [];
    loading: boolean;
    status: boolAndNull;
    error: string;
  };
}
export interface fitClassReadInter {
  fitclasses: fitClassBase[] | [];
  msg: string;
  status: boolean;
}
export interface fitClassUpdateInter {
  updatedFitClass: fitClassBase[] | [];
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
export interface CancelClassResInter {
  msg: string;
  status: boolean;
  classCanceled: fitClassBase;
}
export interface DeleteClassResInter {
  msg: string;
  status: boolean;
  deletedFitClass: fitClassBase;
}
export type Page = number;

export enum Pages {
  HOME = "HOME",
  DASHBOARD = "DASHBOARD",
  CLASSES = "CLASSES",
}
export enum PagesPaths {
  HOMEPATH = "/",
  DASHBOARDPATH = "/dashboard",
  CLASSESPATH = "/classes",
}
export type PageType = Pages;
export interface modalInter {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  record: fitClassBase;
}
export interface modalCreateInter {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
}
export interface modalDeleteInter {
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleteModalOpen: boolean;
  classId: string;
}
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
export interface UserEditInter {
  name: string;
  email: string;
  password: string;
}

export interface UserEditResInter {
  msg: string;
  status: boolean;
}
export interface UserSignOutResInter {
  currentUser: boolean;
  token: boolean;
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
