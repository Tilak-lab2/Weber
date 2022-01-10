const mongoose=require('mongoose')

const newCategory= new mongoose.Schema({
  Id:{
      type:mongoose.Schema.Types.ObjectId,
  },
  name:{
      type:String,
      required:true
  }

})
const Category=mongoose.model('Category',newCategory)

module.exports=Category
