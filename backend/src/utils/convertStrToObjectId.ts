import mongoose from "mongoose";
const convertStrToObjID = (value: string): mongoose.Types.ObjectId => {
  return new mongoose.Types.ObjectId(value);
};

export default convertStrToObjID;
