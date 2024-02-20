import { BrandListService } from "../services/ProductServices.js";

export const ProductBrandList = async (req, res) => {
  let result = await BrandListService();
  return res.status(200).json(result);
};

