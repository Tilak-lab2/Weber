const User=require("../models/user")
const Products=require("../models/products")
// Creating the products
exports.create=async (req,res)=>{
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
    res.redirect("/")

}catch(err){
    if(err) throw err
    res.json("Bad Request")
    res.redirect('sign-in')
}
}

exports.dashboard=(req,res)=>{
    Products.find({id:req.body.id}).exec((err,data)=>{
        if(err) console.log(err,"error");
        res.render('dashboard',{title:"Dashboard || Weber",records:data})

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
            res.redirect("/api/dashboard")
            
            console.log("Deleted")
        }

    })
    .catch(err=>{
        req.flash("error","Error Cannot Delete User ")
       console.log("Error in deleting",err) 
    })
}

// 
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
        res.redirect("/api/dashboard")
        console.log(result)
    })
     .catch(err=>{
         req.flash("Error in updating the product")
         console.log("Error",err)
     })    

}