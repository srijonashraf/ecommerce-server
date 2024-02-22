import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const UserSchema = new mongoose.Schema(
  {
    userId: { type: String, default: () => uuidv4().slice(0, 8), unique: true },
    name: { type: String, default: "" },
    avatar: { type: String, default: "" },
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, default: "" },
    mobile: { type: String, default: "" },
    otp: { type: String, default: "" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
