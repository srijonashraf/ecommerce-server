import express from "express";
import * as ProductController from "../controllers/ProductController.js";
import * as UserController from "../controllers/UserController.js"
import Auth from "../middlewares/Auth.js";
const router = express.Router();

//Product
router.get("/ProductBrandList", ProductController.ProductBrandList);
router.get("/ProductCategoryList", ProductController.ProductCategoryList);
router.get("/ProductListByBrand/:BrandID",ProductController.ProductListByBrand);
router.get("/ProductListByCategory/:CategoryID",ProductController.ProductListByCategory);


//User
router.get("/UserOTP/:email",UserController.UserOTP);
router.get("/VerifyOTP/:email/:otp",UserController.UserVerifyOTP);
router.post("/CreateProfile",Auth,UserController.CreateProfile);
router.post("/UpdateProfile",Auth,UserController.UpdateProfile)

export default router;
