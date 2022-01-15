const express=require('express')
const app=express()
// to use flash
const flash = require('connect-flash');

const expressLayouts = require('express-ejs-layouts');
// For storing the cookies
const session=require('express-session')
// For authentication purpose we use passport
const passport=require('passport')

const passportLocal=require("./config/passport")
// Google o-auth 
const passportGoogle=require("./config/passport_google_oauth")
// for storing cookies in db
 const MongoStore=require('connect-mongo')(session)
const customMware = require('./config/middleware');
// Getting the database connection
const db=require("./config/mongoose")
// For joining __dirname with ejs
const path=require('path')

// For storing passwords We use dotenv
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

// For using CSS and JS 
app.use(express.static('./assets'))

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
// For authentication passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash())
// to use flash as middleware
app.use(customMware.setFlash);

app.use("/",require("./routes"))
// Anything after /api will be redirected to ./routes/api
app.use("/api",require("./routes/api"))
app.listen(port,()=>{
    console.log(`running on localhost${port}`)
})