const express=require('express')
const app=express()
const path=require('path')
require('dotenv').config()
const port=process.env.PORT
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'./views'))
app.use(express.urlencoded({extended:true}))





app.listen(port,()=>{
    console.log(`running on localhost${port}`)
})