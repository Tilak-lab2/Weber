const User=require("../models/user")
const Products=require("../models/products")
const Product = require("../models/products")
   // Reading all the products items

   exports.dashboardItems= (req,res)=>{
    Product.find({}).exec((err,data)=>{
       if(data){
           res.render('info',{title:"info || Weber",records:data})
       }
       else{
           return console.log("Error",err)
       }
     })
 }
// Creating the products
exports.create=async (req,res)=>{
    const id=req.params.id
   try{
    const product=new Products({
        Categoryname:req.body.Categoryname,
        name:req.body.name,
        quantity:req.body.quantity,
        unitPrice:req.body.unitPrice,
        unitStock:req.body.unitStock,
        discontinued:req.body.discontinued
    })
    const Product=await  product.save()
    console.log(Product)
    req.flash("success","Product Added")
    res.redirect('/api/read')

}catch(err){
    if(err) throw err
    res.json("Bad Request")
    res.redirect('sign-in')
}
}
// Getting a particular product with/:id
exports.dashboard=(req,res)=>{
    const id=req.params.id
    console.log(id)
    Product.findById(id).then((data)=>{
        res.render('dashboard',{title:"Dashboard",records:data})
    })
  .catch(err=>{
      res.json(500).json({
          message:"Internal Server Error"
      })
  })
}
// Deleting the products with the help of id:
exports.deleteItems=(req,res)=>{
    const id=req.params.id
     Products.findByIdAndDelete(id).then(data=>{
        if(!data){
            res.status(404).send({
                message:"Error in Deleting the product"
            })
        }
        else{
            req.flash("success","Item Deleted")
            res.redirect("back")
            
            console.log("Deleted")
        }

    })
    .catch(err=>{
        req.flash("error","Error Cannot Delete User ")
       console.log("Error in deleting",err) 
    })
}

// Rendering the update page
exports.updateItems=(req,res)=>{
  
    const id=req.params.id
    
    try{
        Products.findById(id).exec(function(err,data){
           console.log(data)
            if(err) throw err
            res.render('update',{title:"Edit || MyTube",records:data})
        })
    }catch(err){
        req.flash("error","Error in Updating")
    }
        

}
//Updating the product
exports.Update=async(req,res)=>{
    const id=req.params.id
    console.log(id)

    let update=  await Products.findOneAndUpdate(id,{
       $set:{
        Categoryname:req.body.Categoryname,
        name:req.body.name,
        quantity:req.body.quantity,
        unitPrice:req.body.unitPrice,
        unitStock:req.body.unitStock,
        discontinued:req.body.discontinued
       }
    })
    .then(result=>{
        req.flash("success","Updated")
        res.redirect("back")
        console.log(result)
    })
     .catch(err=>{
         req.flash("Error in updating the product")
         console.log("Error",err)
     })    

    }
 