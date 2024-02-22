import {
  BrandListService,
  DeteleBrandService,
  SaveBrandService,
} from "../services/BrandServices.js";

export const CreateBrand = async (req, res) => {
  let result = await SaveBrandService(req);
  return res.status(200).json(result);
};

export const UpdateBrand = async (req, res) => {
  let result = await SaveBrandService(req);
  return res.status(200).json(result);
};

export const DeleteBrand = async (req, res) => {
  let result = await DeteleBrandService(req);
  return res.status(200).json(result);
};

export const BrandList = async (req, res) => {
  let result = await BrandListService(req);
  return res.status(200).json(result);
};
