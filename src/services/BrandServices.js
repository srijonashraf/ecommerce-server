import mongoose from "mongoose";
import BrandModel from "./../model/BrandModel.js";

const ObjectId = mongoose.Types.ObjectId;
export const SaveBrandService = async (req) => {
  try {
    let BrandID = new ObjectId(req.params.BrandID);
    let reqBody = req.body;

    let SaveBrandResponse = await BrandModel.updateOne(
      { _id: BrandID },
      { $set: reqBody },
      { upsert: true }
    );

    if (
      SaveBrandResponse.modifiedCount > 0 ||
      SaveBrandResponse.upsertedCount > 0
    ) {
      return {
        status: "success",
        message: "Brand details saved successfully.",
      };
    } else {
      return {
        status: "fail",
        message:
          "Failed to save details. Brand not found or no changes were made.",
      };
    }
  } catch (error) {
    return { status: "fail", message: "Something went wrong.", data: error };
  }
};

export const DeteleBrandService = async (req) => {
  try {
    let BrandID = new ObjectId(req.params.BrandID);

    const DeleteBrandResponse = await BrandModel.deleteOne({
      _id: BrandID,
    });
    if (DeleteBrandResponse.deletedCount > 0) {
      return { status: "success", message: "Brand deleted successfully." };
    } else {
      return { status: "fail", message: "Brand not found." };
    }
  } catch (error) {
    return { status: "fail", message: "Something went wrong.", data: error };
  }
};

export const BrandListService = async (req) => {
  let data = await BrandModel.find();

  if (!data) {
    return { status: "fail", message: "Data not found" };
  }
  return { status: "success", data: data };
};
