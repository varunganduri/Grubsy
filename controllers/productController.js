import Product from "../models/Product.js"
import Firm from "../models/Firm.js"

export const AddProduct= async(req,res)=>{
    try{
        const firmId=req.params.id
           const existFirm=await Firm.findById(firmId)
           if(!existFirm)
           {
            return res.status(400).json({message:"no firm is exist"})
           }
           if(String(existFirm.vendor)!==String(req.vendorId)){
            return res.status(400).json({message:"you are not the vendor of this firm"})
           }
        const{name,price,category,description}=req.body

        const imagePath=req.file? req.file.path : undefined
         
        const product=new Product({name,price,category,image:imagePath,description,firm:existFirm._id})

        const savedProduct=await product.save()
        res.status(201).json({message:"product added successfully",savedProduct})
    }catch(err){
        console.log(err)
        res.status(500).json({message:"internal server error while adding the product"})
    }
}

export const GetProducts= async(req,res)=>{
    try{
        const firmId=req.params.id
             const existFirm=await Firm.findById(firmId)
           if(!existFirm)
           {
            return res.status(400).json({message:"no firm is exist"})
           }
      let products=await Product.find({firm:existFirm._id})
      res.status(200).json({message:"products are fetched successfully",hotel_name:existFirm.firmName,products})
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({message:"internal server error while getting the products"})
    }
}