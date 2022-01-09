const mongoose=require("mongoose")
 
 
const productSchema=new mongoose.Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId,
    },
    name:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,

    },
    quantity:{
        type:Number,
        required:true,
    },
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
  
    price:{
        type:Number,
        required:true,
    },
    
},{
    timestamps:{
        required:true
    }
})
const Product=mongoose.model('Product',productSchema)
module.exports=Product