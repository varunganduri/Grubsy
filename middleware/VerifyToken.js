import jwt from 'jsonwebtoken';
import Vendor from '../models/Vendor.js';


export const VerifyToken = async(req,res,next)=>{

    const token = req.headers.authorization;//getting token from header 

    if(!token)
    {
    return res.status(401).json({message:"Access Denied,provide token"});
    }

    try{
        let decoded=jwt.verify(token,"secret")

        const vendor=await Vendor.findById(decoded.vendorId) // getting vendor from database using vendorId from decoded token

        if(!vendor)
        {
            return res.status(401).json({message:"vendor not found"})
        }

        req.vendor=vendor; //storing vendor in req object
        req.vendorId=vendor._id //storing vendor id in req object
        next()
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).json({message:"internal server error while verifying token"})
    }
}