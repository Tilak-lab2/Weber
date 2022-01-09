const passport=require("passport")
const googleStrategy=require("passport-google-oauth").OAuth2Strategy
const crypto=require("crypto")
const User=require("../models/user")

//tell passport to use new strategy
passport.use(new googleStrategy({
    clientID:'144331555962-ij08taj8jmf9dphle4j7as3876fqpv77.apps.googleusercontent.com',
    clientSecret:'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',
    callbackURL:'http://localhost:8000/auth/google/callback',


},(accessToken,refreshToken,profile,done)=>{
    User.findOne({email:profile.emails[0].value}).exec((err,user)=>{
        if(err){
            console.log("err",err)
            return
        }
       console.log(profile)
       if(user){
           //find user
           return done(null,user)
       }else{
           User.create({
               name:profile.displayName,
               email:profile.emails[0].value,
               password:crypto.randomBytes(20).toString('hex'),
           },(err,user)=>{
               if(err){
                   console.log("err in creating user")
                   return
               }
               return done(null,user)
           })
       }
    })
}

))
module.exports=passport