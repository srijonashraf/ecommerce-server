import {
  CategoryListService,
  DeteleCategoryService,
  SaveCategoryService,
} from "../services/CategoryServices.js";

export const CreateCatagory = async (req, res) => {
  let result = await SaveCategoryService(req);
  return res.status(200).json(result);
};

export const UpdateCatagory = async (req, res) => {
  let result = await SaveCategoryService(req);
  return res.status(200).json(result);
};

export const DeleteCatagory = async (req, res) => {
  let result = await DeteleCategoryService(req);
  return res.status(200).json(result);
};

export const CategoryList = async (req, res) => {
  let result = await CategoryListService(req);
  return res.status(200).json(result);
};
