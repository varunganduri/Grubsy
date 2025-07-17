import mongoose from 'mongoose';
const FirmSchema = mongoose.Schema({
    firmName:{
        type:String,
        required:true,
        unique:true
    },
    area:{
        type:String,
        required:true
    },
    category:{
        type:[
            {
                type:String,
                enum:["veg","non-veg"]
            }
        ],
        required:true,
    },
    region:{
        type:[String],
        enum:["north","south","chinese","japanese"],
        required:true
    },
    offer:String,
    image:String,
    vendor:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vendor",
        required:true
    }]

},{timestamps:true})

const Firm = mongoose.model("Firm",FirmSchema)

export default Firm;