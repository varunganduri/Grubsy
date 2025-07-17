import Firm from "../models/Firm.js"
import Vendor from "../models/Vendor.js"

export const AddFirm = async(req,res)=>{
 try{
      const {firmName,area,category,region,offer}=req.body
      //getting data from body to create firm

      const exist=await Firm.findOne({firmName:firmName})
      if(exist){
        res.status(401).json({message:"firm already exist"})
      } 
      //checking if firm already exist

      const imagePath = req.file ? req.file.path : null;

      const newFirm = new Firm({firmName,area,category,region,offer,image:imagePath,vendor:req.vendorId}) //creating firm with vendor id getting from token

      await newFirm.save()
      //saving details of firm into database 

      res.status(200).json({message:"firm added successfully",newFirm})

      await Vendor.findByIdAndUpdate(req.vendorId, { $push: { firms: newFirm._id } });//pushing firm id into vendor collection

 }
 catch(err)
 {
    res.status(500).json(err)
    console.log(err)
 }
}

export const GetFirm =async(req,res)=>{
  try{
       const vendorId=req.vendorId
       const firms=await Firm.find({vendor:vendorId})
       if(!firms)
       {
        res.status(404).json({message:"firms not found"})
       }
       res.status(200).json(firms)
  }
  catch(err){
    res.status(500).json(err)
    console.error(err)
  }
}