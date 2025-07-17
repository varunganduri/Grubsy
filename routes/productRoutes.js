import express from 'express';
import { AddProduct, GetProducts } from '../controllers/productController.js';
import { uploadProductImage } from '../middleware/multer.js';
const router=express.Router()
import { VerifyToken } from '../middleware/VerifyToken.js';

router.post("/add-product/:id",VerifyToken,uploadProductImage.single('image'),AddProduct)

router.get("/all-products/:id",GetProducts)

export default router;