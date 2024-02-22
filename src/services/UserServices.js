import mongoose from "mongoose";
import UserModel from "./../model/UserModel.js";
import OTP from "otp";
import EmailSend from "./../utility/EmailHelper.js";
import { EncodeToken } from "../utility/TokenHelper.js";

export const SendOTPService = async (req) => {
  try {
    var otpValue = new OTP().totp();

    let email = req.params.email;

    let EmailText = `
    <html>
    <body>
      <div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2">
        <div style="margin: 50px auto; width: 70%; padding: 20px 0">
          <div style="border-bottom: 1px solid #eee">
            <a href="" style="font-size: 1.4em; color: #00466a; text-decoration: none; font-weight: 600">eShop</a>
          </div>
          <p style="font-size: 1.1em">Hi,</p>
          <p>Thank you for choosing eShop. Use the following OTP to complete your Sign Up procedures. OTP is valid for 2 minutes.</p>
          <h2 style="background: #00466a; margin: 0 auto; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px;">${otpValue}</h2>
          <p style="font-size: 0.9em;">Regards,<br />eShop</p>
          <hr style="border: none; border-top: 1px solid #eee" />
          <div style="float: right; padding: 8px 0; color: #aaa; font-size: 0.8em; line-height: 1; font-weight: 300">
            <p>eShop Team</p>
            <p>Dhanmondi, Dhaka</p>
            <p>Bangladesh</p>
          </div>
        </div>
      </div>
      </body>
      </html>
    `;

    let EmailSubject = "eShop - Email Verification";

    await EmailSend(email, EmailText, EmailSubject);

    await UserModel.updateOne(
      { email: email },
      { $set: { otp: otpValue } },
      { upsert: true }
    );

    // Schedule OTP expiration after 2 minutes
    setTimeout(async () => {
      await UserModel.updateOne(
        { email: email },
        { $set: { otp: "" } } // Set otp to empty
      );
    }, 2 * 60 * 1000); // 2 minutes in milliseconds

    return { status: "success", message: "6 digit OTP is sent successfully." };
  } catch (error) {
    return { status: "fail", data: error };
  }
};

export const VerifyOTPService = async (req) => {
  try {
    const email = req.params.email;
    const otp = req.params.otp;

    if (!email || !otp) {
      return { status: "fail", message: "Email or OTP not found from param" };
    }

    // User Count
    let total = await UserModel.find({ email: email, otp: otp }).count("total");
    if (total === 1) {
      let userId = await UserModel.find({ email: email, otp: otp }).select(
        "userId"
      );

      // User Token Create
      let token = EncodeToken(email, userId[0]["userId"].toString());

      // OTP Code Update To empty
      await UserModel.updateOne({ email: email }, { $set: { otp: "" } });

      return {
        status: "success",
        message: "OTP verified successfully.",
        token: token,
      };
    } else {
      return { status: "fail", message: "Invalid or expired OTP." };
    }
  } catch (error) {
    return { status: "fail", message: "Something went wrong.", data: error };
  }
};

export const SaveProfileService = async (req) => {
  try {
    let userId = req.headers.userId;
    let reqBody = req.body;

    if (!userId) {
      return {
        status: "fail",
        message: "User Id not found from header. Check token",
      };
    }

    await UserModel.updateOne(
      { userId: userId },
      { $set: reqBody },
      { upsert: true }
    );
    return {
      status: "success",
      message: "Profile details saved successfully.",
    };
  } catch (error) {
    return { status: "fail", message: "Something went wrong.", data: error };
  }
};
