import express from 'express';

import { VendorGetAll, VendorGetOne, VendorLogin, VendorRegister } from "../controllers/vendorController.js";

const router= express.Router();

router.post("/register",VendorRegister)
router.get("/all",VendorGetAll)
router.get('/single/:id',VendorGetOne)
router.post("/login",VendorLogin)

export default router;