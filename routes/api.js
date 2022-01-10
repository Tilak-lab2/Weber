const router=require("express").Router()
 const Productcontroller=require("../controllers/Productcontroller")
 const passport=require("passport")

router.post("/create",Productcontroller.create)
module.exports=router