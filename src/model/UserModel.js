import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const UserSchema = new mongoose.Schema(
  {
    userId: { type: String, default: () => uuidv4().slice(0, 8), unique: true },
    avatar: { type: String },
    name: { type: String },
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String },
    mobile: { type: String },
    otp: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
