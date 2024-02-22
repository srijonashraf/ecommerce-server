import CategoryModel from "./../model/CategoryModel.js";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;
export const SaveCategoryService = async (req) => {
  try {
    let CategoryID = new ObjectId(req.params.CategoryID);
    let reqBody = req.body;

    let SaveCategoryResponse = await CategoryModel.updateOne(
      { _id: CategoryID },
      { $set: reqBody },
      { upsert: true }
    );
    console.log(CategoryID);
    console.log(SaveCategoryResponse);

    if (
      SaveCategoryResponse.modifiedCount > 0 ||
      SaveCategoryResponse.upsertedCount > 0
    ) {
      return {
        status: "success",
        message: "Category details saved successfully.",
      };
    } else {
      return {
        status: "fail",
        message:
          "Failed to save details. Category not found or no changes were made.",
      };
    }
  } catch (error) {
    return { status: "fail", message: "Something went wrong.", data: error };
  }
};

export const DeteleCategoryService = async (req) => {
  try {
    let CategoryID = new ObjectId(req.params.CategoryID);

    const DeleteCategoryResponse = await CategoryModel.deleteOne({
      _id: CategoryID,
    });
    if (DeleteCategoryResponse.deletedCount > 0) {
      return { status: "success", message: "Category deleted successfully." };
    } else {
      return { status: "fail", message: "Category not found." };
    }
  } catch (error) {
    return { status: "fail", message: "Something went wrong.", data: error };
  }
};

export const CategoryListService = async (req) => {
  let ProjectionStage = {
    $project: {
      _id: 0,
      createdAt: 0,
      updatedAt: 0,
    },
  };

  let data = await CategoryModel.aggregate([ProjectionStage]);

  if (!data) {
    return { status: "fail", message: "Data not found" };
  }
  return { status: "success", data: data };
};
