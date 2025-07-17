import mongoose from 'mongoose';

const vendorSchema =mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
    },
    firms:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Firm'
    }]

})

const Vendor = mongoose.model("Vendor",vendorSchema)

export default Vendor;