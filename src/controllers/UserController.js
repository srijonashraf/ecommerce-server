import {
  SaveProfileService,
  SendOTPService,
  VerifyOTPService,
} from "../services/UserServices.js";

export const UserOTP = async (req, res) => {
  let result = await SendOTPService(req);
  return res.status(200).json(result);
};

export const UserVerifyOTP = async (req, res) => {
  let result = await VerifyOTPService(req);
  return res.status(200).json(result);
};

export const CreateProfile = async (req, res) => {
  let result = await SaveProfileService(req);
  return res.status(200).json(result);
};

export const UpdateProfile = async (req, res) => {
  let result = await SaveProfileService(req);
  return res.status(200).json(result);
};
