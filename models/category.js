const mongoose=require('mongoose')

const newCategory= new mongoose.Schema({
  Id:{
      type:mongoose.Schema.Types.ObjectId,
  },
  Categoryname:{
      type:String,
      required:true
  }

},{
    timestamps:true,
})
const Category=mongoose.model('Category',newCategory)

module.exports=Category
