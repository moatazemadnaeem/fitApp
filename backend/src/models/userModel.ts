import mongoose from "mongoose";
import { UserRes } from "../types";
const userschema = new mongoose.Schema<UserRes>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model<UserRes>("User", userschema);
export default User;
