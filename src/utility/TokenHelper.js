import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const EncodeToken = (email, user_id) => {
  const KEY = process.env.JWT_SECRET;
  const EXPIRE = { expiresIn: process.env.JWT_EXPIRATION_TIME };
  const PAYLOAD = { email: email, user_id: user_id };
  return jwt.sign(PAYLOAD, KEY, EXPIRE);
};

export const DecodeToken = (token) => {
  try {
    const KEY = process.env.JWT_SECRET;
    return jwt.verify(token, KEY);
  } catch (error) {
    return null;
  }
};
