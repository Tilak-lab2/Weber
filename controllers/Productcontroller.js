
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
        req.flash("success","Error Cannot Delete User ")
       console.log("Error in deleting",err) 
    })
}