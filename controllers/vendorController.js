import Vendor from "../models/Vendor.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const VendorRegister = async(req,res)=>{
    try{
       const{username,email,password}=req.body;
       const exist = await Vendor.findOne({email})
       if(exist){
        return res.status(400).json({message:"user already exist"})
       }
       const hashed=await bcrypt.hash(password,10)
       const newVendor = new Vendor({username,email,password:hashed})
       await newVendor.save()
       res.status(201).json({message:"Vendor created successfully",newVendor})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"internal server error"})
    }
}

export const VendorLogin = async(req,res)=>{
    try{
        const {email,password}=req.body;
        const vendor = await Vendor.findOne({email})
        if(!vendor)
        {
            return res.status(400).json({message:"invalid username"})
        }
        const isMatch= await bcrypt.compare(password,vendor.password)
        if(!isMatch){
            return res.status(400).json({message:"invalid password"})
        }
         const token=jwt.sign({vendorId:vendor._id,username:vendor.username},"secret",{expiresIn:"1h"})
         res.status(200).json({message:"vendor login sucessfully",token})
         console.log(token)
        
    
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"internal server error while login"})
    }
}

export const VendorGetAll = async(req,res)=>{
    try{
      let vendors=await  Vendor.find()
      if(!vendors)
      {
        return res.status(400).json({message:"no vendors found"})
      }
      res.status(200).json(vendors)
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({message:"internal server error while getting all vendors"})
    }
}

export const VendorGetOne = async(req,res)=>{
    try{
        const id =req.params.id;
      let vendor=await Vendor.findById(id).populate('firms')
      if(!vendor)
      {
        return res.status(400).json({message:"no vendor found"})
      }
      res.status(200).json(vendor)
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({message:"internal server error while getting vendor"})
    }
}

