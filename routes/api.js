const router=require("express").Router()
 const Productcontroller=require("../controllers/Productcontroller")
 const passport=require("passport")

router.post("/create",Productcontroller.create)
router.get("/dashboard",Productcontroller.dashboard)
router.get("/delete/:id",Productcontroller.deleteItems)
module.exports=router