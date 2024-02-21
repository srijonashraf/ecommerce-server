import express from "express";
import * as ProductController from "../controllers/ProductController.js";
const router = express.Router();

//Product
router.get("/ProductBrandList", ProductController.ProductBrandList);
router.get("/ProductCategoryList", ProductController.ProductCategoryList);
router.get("/ProductListByBrand/:BrandID",ProductController.ProductListByBrand
);

export default router;
