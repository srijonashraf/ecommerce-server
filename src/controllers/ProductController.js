import {
  DeleteService,
  DetailsService,
  ListByBrandService,
  ListByCategoryService,
  ListByKeywordService,
  ListByRemarkService,
  SaveService,
} from "../services/ProductServices.js";

export const ProductListByBrand = async (req, res) => {
  let result = await ListByBrandService(req);
  return res.status(200).json(result);
};

export const ProductListByCategory = async (req, res) => {
  let result = await ListByCategoryService(req);
  return res.status(200).json(result);
};

export const ProductListByRemark = async (req, res) => {
  let result = await ListByRemarkService(req);
  return res.status(200).json(result);
};

export const ProductListByKeyword = async (req, res) => {
  let result = await ListByKeywordService(req);
  return res.status(200).json(result);
};

export const ProductDetails = async (req, res) => {
  let result = await DetailsService(req);
  return res.status(200).json(result);
};

export const ProductCreate = async (req, res) => {
  let result = await SaveService(req);
  return res.status(200).json(result);
};

export const ProductUpdate = async (req, res) => {
  let result = await SaveService(req);
  return res.status(200).json(result);
};

export const ProductDelete = async (req, res) => {
  let result = await DeleteService(req);
  return res.status(200).json(result);
};
