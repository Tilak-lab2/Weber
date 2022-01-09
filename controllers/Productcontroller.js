
const Products=require("../models/products")



module.exports.dashboard=(req,res,next)=>{
    Products.find({email:req.body.email}).exec((err,data)=>{
        if(err) console.log(err,"error");
        res.render('dashboard',{title:"Dashboard",records:data})

    })
  
}
// module.exports.dashboard=(req,res)=>{

//     res.render("dashboard",{title:"Dashboard || MyTube"})
// }

module.exports.Items=async (req,res)=>{
   
    try{
    const product=new Products({
        name:req.body.name,
        desc:req.body.desc,
        quantity:req.body.quantity,
        price:req.body.price,
        image:req.file,
        

    })
  
    
   let products=await product.save()
   console.log(products)
   
   res.redirect("/")

   }catch(err){
       if(err) throw err
       res.json("Bad Request")
       res.redirect("sign-in")
   }
    
    
}
module.exports.getItems=(req,res)=>{
     Products.find({},(err,data)=>{
         if(!err){
             res.send(data)

         }
         else{
           console.log(err)
         }
     })
    }
exports.updateItems=(req,res)=>{
  
    const id=req.params.id
     Products.findById(id).exec(function(err,data){
        if(err) throw err
        res.render('_edit',{title:"Edit || MyTube",records:data})
    })

}
exports.update=(req,res)=>{
    var update=Products.findByIdAndUpdate(req.body.id,{
        name:req.body.name,
        desc:req.body.desc,
        quantity:req.body.quantity,
        price:req.body.price,
         
    })
    console.log("Updated")
    res.status(200).json("Success")
  
  res.redirect("/api/dashboard")


}
exports.deleteItems=(req,res)=>{
    const id=req.params.id
    Products.findByIdAndDelete(id).then(data=>{
        if(!data){
            res.status(404).send({
                message:"Error in Deleting The product"
            })
        }
        else{
            console.log("Deleted")
            res.send({
                message:"Deleted"
            })

            
        }
    })
    
    .catch(err=>{
        res.status(500).send({
            message:"Couldn't Delete User with Id"
        })
    })
}
module.exports.find=(req,res)=>{
    if(req.query.id){
        const id=req.query.id
        Products.findById(id).then(data=>{
            if(data){
                res.status(404).send({Message:'Not Found'})
            }
            else{
                res.send(data)
           }
        })
        .catch(err=>{
            res.status(500).send(err)
        })
    }
}

module.exports.uploaded=(req,res)=>{
   
    if(req.files){
        console.log(req.files)
        var file=req.files.file
        var filename=file.filename 

        file.mv('public/uploads'+filename,function(err){
            if(err){

                res.send(err)
            }
            else{
                res.redirect('/')
                // req.flash("Successful")
            }
        })

    }
}




