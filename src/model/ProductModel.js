import mongoose from "mongoose";

const ProdcutSchema = new mongoose.Schema(
  {
    name: { type: String },
    brand: { type: String },
    category: { type: String },
    description: { type: String },
    img: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ProductModel = mongoose.model("products", ProdcutSchema);

export default ProductModel;
