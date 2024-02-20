import mongoose from "mongoose";
import BrandModel from "./../model/BrandModel.js";
import CategoryModel from "./../model/CategoryModel.js";
import ProductModel from "./../model/ProductModel.js";

export const BrandListService = async () => {
  try {
    let data = await BrandModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error }.toString();
  }
};
