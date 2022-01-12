const router=require("express").Router()
 const Productcontroller=require("../controllers/Productcontroller")
 const passport=require("passport")

router.post("/create",Productcontroller.create)
router.get("/dashboard",Productcontroller.dashboard)
router.get("/delete/:id",Productcontroller.deleteItems)
router.get("/edit/:id",Productcontroller.updateItems)
router.post("/updateItem",Productcontroller.Update)
module.exports=router