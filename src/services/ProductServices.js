import mongoose from "mongoose";
import BrandModel from "./../model/BrandModel.js";
import CategoryModel from "./../model/CategoryModel.js";
import ProductModel from "./../model/ProductModel.js";

const ObjectId = mongoose.Types.ObjectId;
export const BrandListService = async () => {
  try {
    let data = await BrandModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error };
  }
};

export const CategoryListService = async () => {
  try {
    let data = await CategoryModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error };
  }
};

export const ListByBrandService = async (req) => {
  try {
    let BrandID = new ObjectId(req.params.BrandID);

    let MatchStage = { $match: { brandID: BrandID } };

    //   Equality Match with a Single Join Condition
    //   {
    //     $lookup:
    //       {
    //         from: <collection to join>,
    //         localField: <field from the input documents>,
    //         foreignField: <field from the documents of the "from" collection>,
    //         as: <output array field>
    //       }
    //  }

    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };

    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };

    // Unwind Array
    // ({ "_id" : 1, "item" : "ABC1", sizes: [ "S", "M", "L"] })
    // { "_id" : 1, "item" : "ABC1", "sizes" : "S" }
    // { "_id" : 1, "item" : "ABC1", "sizes" : "M" }
    // { "_id" : 1, "item" : "ABC1", "sizes" : "L" }

    let UnwindBrandStage = { $unwind: "$brand" };

    let UnwindCategoryStage = { $unwind: "$category" };

    let ProjectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        "brand.createdAt": 0,
        "brand.updatedAt": 0,
        "category.createdAt": 0,
        "category.updatedAt": 0,
        categoryID: 0,
        brandID: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    };

    // Query
    let data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage,
    ]);

    if (!data) {
      return { status: "fail", message: "Data not found" };
    }
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error };
  }
};

export const ListByCategoryService = async (req) => {
  try {
    let CategoryID = new ObjectId(req.params.CategoryID);

    let MatchStage = { $match: { categoryID: CategoryID } };

    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };

    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };

    let UnwindBrandStage = { $unwind: "$brand" };

    let UnwindCategoryStage = { $unwind: "$category" };

    let ProjectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        "brand.createdAt": 0,
        "brand.updatedAt": 0,
        "category.createdAt": 0,
        "category.updatedAt": 0,
        categoryID: 0,
        brandID: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    };

    // Query
    let data = await ProductModel.aggregate([
      MatchStage,
      JoinWithCategoryStage,
      JoinWithBrandStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage,
    ]);

    if (!data) {
      return { status: "fail", message: "Data not found" };
    }
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error };
  }
};


