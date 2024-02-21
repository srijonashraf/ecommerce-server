import {
  BrandListService,
  CategoryListService,
  ListByBrandService,
} from "../services/ProductServices.js";

export const ProductBrandList = async (req, res) => {
  let result = await BrandListService();
  return res.status(200).json(result);
};

export const ProductCategoryList = async (req, res) => {
  let result = await CategoryListService();
  return res.status(200).json(result);
};

export const ProductListByBrand = async (req, res) => {
  let result = await ListByBrandService(req);
  return res.status(200).json(result);
};
