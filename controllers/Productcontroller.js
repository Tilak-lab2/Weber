
const Products=require("../models/products")
const category=require("../models/category")

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
    res.redirect("/")

}catch(err){
    if(err) throw err
    res.json("Bad Request")
    res.redirect('sign-in')
}
}

