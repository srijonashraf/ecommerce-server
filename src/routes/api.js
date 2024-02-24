import express from "express";
import * as ProductController from "../controllers/ProductController.js";
import * as UserController from "../controllers/UserController.js";
import * as CategoryController from "../controllers/CategoryController.js";
import * as BrandController from "../controllers/BrandController.js";
import Auth from "../middlewares/Auth.js";
const router = express.Router();

//Product
router.get("/ProductListByBrand/:BrandID", ProductController.ProductListByBrand);
router.get("/ProductListByCategory/:CategoryID", ProductController.ProductListByCategory);
router.get("/ProductListByRemark/:Remark", ProductController.ProductListByRemark);
router.get("/ProductListByKeyword/:Keyword", ProductController.ProductListByKeyword);
router.post('/ProductListByFilter', ProductController.ProductListByFilter);
router.get('/AllProductList', ProductController.AllProductList);

router.get("/ProductDetails/:ProductID", ProductController.ProductDetails);
router.post("/CreateProduct", Auth, ProductController.ProductCreate);
router.post("/UpdateProduct/:ProductID", Auth, ProductController.ProductUpdate);
router.get("/DeleteProduct/:ProductID", Auth, ProductController.ProductDelete);

router.post("/CreateCategory", Auth, CategoryController.CreateCatagory);
router.post("/UpdateCategory/:CategoryID", Auth, CategoryController.UpdateCatagory);
router.get("/DeleteCategory/:CategoryID", Auth, CategoryController.DeleteCatagory);

router.post("/CreateBrand", Auth, BrandController.CreateBrand);
router.post("/UpdateBrand/:BrandID", Auth, BrandController.UpdateBrand);
router.get("/DeleteBrand/:BrandID", Auth, BrandController.DeleteBrand);

router.get("/BrandList", BrandController.BrandList);
router.get("/CategoryList", CategoryController.CategoryList);

//User
router.get("/UserOTP/:email", UserController.UserOTP);
router.get("/VerifyOTP/:email/:otp", UserController.UserVerifyOTP);
router.get("/ProfileDetails",Auth, UserController.ProfileDetails);
router.post("/CreateProfile", Auth, UserController.CreateProfile);
router.post("/UpdateProfile", Auth, UserController.UpdateProfile);

export default router;
