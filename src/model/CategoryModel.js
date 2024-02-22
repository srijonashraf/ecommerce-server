import mongoose from "mongoose";
const CategorySchema = mongoose.Schema(
  {
    categoryName: { type: String, unique: true, required: true },
    categoryImg: { type: String, requied: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const CategoryModel = mongoose.model("categories", CategorySchema);

export default CategoryModel;
