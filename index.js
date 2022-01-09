const express=require('express')
const app=express()
const flash = require('connect-flash');
const expressLayouts = require('express-ejs-layouts');
const session=require('express-session')
const passport=require('passport')
const passportLocal=require("./config/passport")
 const passportGoogle=require("./config/passport_google_oauth")
const MongoStore=require('connect-mongo')(session)
const customMware = require('./config/middleware');
const db=require("./config/mongoose")
const path=require('path')

const methodOverride=require("method-override")
const GridFsStorage=require("multer-gridfs-storage")
require('dotenv').config()
const port=process.env.PORT
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'./views'))
app.use(express.urlencoded({extended:true}))
app.use(expressLayouts);
app.use(session({
    secret:process.env.SESSION_COOKIE,
    resave:false,
    saveUninitialized:true,
    cookie:{ maxAge: (1000 * 60 * 100)},
    store:new MongoStore({
        mongooseConnection:db,
        autoRemove: 'disabled',
    },
    function(err){
        console.log(err ||  'connect-mongodb setup ok');
    }
    )
}))


app.use(express.static('./assets'))

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash())
app.use(customMware.setFlash);
app.use("/",require("./routes"))
app.listen(port,()=>{
    console.log(`running on localhost${port}`)
})