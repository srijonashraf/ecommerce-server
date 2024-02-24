import mongoose from "mongoose";
import ProductModel from "./../model/ProductModel.js";
import ProductDetailModel from "./../model/ProductDetailModel.js";

const ObjectId = mongoose.Types.ObjectId;
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

export const ListByRemarkService = async (req) => {
  try {
    let remark = req.params.Remark;

    let MatchStage = { $match: { remark: remark } };

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

export const ListByKeywordService = async (req) => {
  try {
    let SearchRegex = { $regex: req.params.Keyword, $options: "i" };
    //$options: "i" for case insensitive
    let SearchParams = [{ title: SearchRegex }, { shortDes: SearchRegex }];

    let SearchQuery = { $or: SearchParams };

    let MatchStage = { $match: SearchQuery };

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
  } catch (error) {}
};

export const ListByFilterService = async (req) => {
  try {
    let matchConditions = {};
    if (req.body["categoryID"]) {
      matchConditions.categoryID = new ObjectId(req.body["categoryID"]);
    }
    if (req.body["brandID"]) {
      matchConditions.brandID = new ObjectId(req.body["brandID"]);
    }
    let MatchStage = { $match: matchConditions };

    let AddFieldsStage = {
      $addFields: { numericPrice: { $toInt: "$price" } },
    };
    let priceMin = parseInt(req.body["priceMin"]);
    let priceMax = parseInt(req.body["priceMax"]);
    let PriceMatchConditions = {};
    if (!isNaN(priceMin)) {
      PriceMatchConditions["numericPrice"] = { $gte: priceMin };
    }
    if (!isNaN(priceMax)) {
      PriceMatchConditions["numericPrice"] = {
        ...(PriceMatchConditions["numericPrice"] || {}),
        $lte: priceMax,
      };
    }
    let PriceMatchStage = { $match: PriceMatchConditions };

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
        categoryID: 0,
        brandID: 0,
      },
    };

    let data = await ProductModel.aggregate([
      MatchStage,
      AddFieldsStage,
      PriceMatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage,
    ]);

    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e }.toString();
  }
};

export const DetailsService = async (req) => {
  try {
    let ProductID = new ObjectId(req.params.ProductID);
    let MatchStage = { $match: { _id: ProductID } };

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
    let JoinWithDetailsStage = {
      $lookup: {
        from: "productdetails",
        localField: "_id",
        foreignField: "productID",
        as: "details",
      },
    };

    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };
    let UnwindDetailsStage = { $unwind: "$details" };

    let ProjectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
      },
    };

    let data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      JoinWithDetailsStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      UnwindDetailsStage,
      ProjectionStage,
    ]);

    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e };
  }
};

export const SaveService = async (req) => {
  try {
    let ProductID = new ObjectId(req.params.ProductID);
    let reqBody = req.body;

    const SaveProductDetailsResponse = await ProductDetailModel.updateOne(
      {
        productID: ProductID,
      },
      {
        img1: reqBody.img1,
        img2: reqBody.img2,
        img3: reqBody.img3,
        img4: reqBody.img4,
        img5: reqBody.img5,
        img6: reqBody.img6,
        img7: reqBody.img7,
        img8: reqBody.img8,
        des: reqBody.des,
        color: reqBody.color,
        size: reqBody.size,
      },
      { upsert: true }
    );

    const SaveProductResponse = await ProductModel.updateOne(
      { _id: ProductID },
      { $set: reqBody },
      { upsert: true }
    );

    if (
      SaveProductResponse.modifiedCount > 0 ||
      SaveProductResponse.upsertedCount > 0
    ) {
      return {
        status: "success",
        message: "Product details saved successfully.",
      };
    } else {
      return {
        status: "fail",
        message:
          "Failed to save details. Product not found or no changes were made.",
      };
    }
  } catch (error) {
    return { status: "fail", message: "Failed to save details.", data: error };
  }
};

export const DeleteService = async (req) => {
  try {
    let ProductID = new ObjectId(req.params.ProductID);
    console.log(ProductID);

    const DeleteProdcutResponse = await ProductModel.deleteOne({
      _id: ProductID,
    });

    if (DeleteProdcutResponse.deletedCount > 0) {
      return { status: "success", message: "Product deleted successfully." };
    } else {
      return { status: "fail", message: "Product not found." };
    }
  } catch (error) {
    return { status: "fail", message: "Something went wrong.", data: error };
  }
};

export const AllProductService = async (req) => {
  try {
    let MatchStage = { $match: {} };

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
      },
    };

    const data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage,
    ]);

    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error };
  }
};
