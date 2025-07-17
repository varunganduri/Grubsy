import mongoose from "mongoose"
const ProductSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
        },
    price:{
        type:Number,
        required:true,
    },
      category:{
        type:[String],
        required:true,
        enum:["veg","non-veg"]
    },
    image:String,
    description:String,
    firm:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
  
})
const Product=mongoose.model("Product",ProductSchema);
export default Product;