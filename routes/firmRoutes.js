import { AddFirm, GetFirm } from "../controllers/firmController.js"
import { VerifyToken } from "../middleware/VerifyToken.js"
import {uploadFirmImage} from '../middleware/multer.js';

import express from "express"

const router = express.Router()

router.post("/add-firm",VerifyToken,uploadFirmImage.single('image'),AddFirm)
router.get("/all-firms",VerifyToken,GetFirm)

export default router;