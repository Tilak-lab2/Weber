const mongoose=require("mongoose")
const Category = require("./category")
 
 
const productSchema=new mongoose.Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId,
    },
    name:{
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
  
   
    unitPrice:{
        type:Number,
        required:true
    },
    unitStock:{
        type:Number,
        required:true,
    },
    
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
    },
    Categoryname:{
        type:String,
        ref:"category",
 
    },
    // discontinued:{
    //      required:true,
        
    // }, 


    
},{
    timestamps:{
        required:true
    }
})
const Product=mongoose.model('Product',productSchema)
module.exports=Product