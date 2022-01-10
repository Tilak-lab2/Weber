const User = require('../models/user');


const bcrypt=require('bcrypt')

const {check,validationResult}=require('express-validator')


module.exports.home=(req,res)=>{
    
     
         res.render('home',{title:"Home | MyTube"})

    
    
}
module.exports.signin=(req,res)=>{
    return res.render('user_sign_in',{title:"Sign In | MyTube"})

}
module.exports.signup=(req,res)=>{
    return res.render('user_sign_up',{
        title:'Sign Up | MyTube'
    })
}
exports.create = async function(req, res){
  try{
      if(req.body.password!=req.body.confirm_password){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
      }
      const newUser = new User({
        name:req.body.name,
        email: req.body.email,
        password:req.body.password,
      });
      bcrypt.genSalt(10,(err,salt)=>{
         bcrypt.hash(newUser.password,salt,(err,hash)=>{
             if(err) throw err
             newUser.password=hash
             newUser.save().then(user=>{
                 req.flash('success',"Registered")
                 res.redirect("sign-in")
             })
         })
      })

     
  }catch(err){
      console.log("error",err)
  }
      
    
}
    


exports.createSession =async  function(req, res){
    console.log(req.body)
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
   
}
 
exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have successfully logged out!');
    
    
    return res.redirect('/');
}
exports.profile=(req,res)=>{
    res.render('profile',{title:'Profile | MyTube'})
}

module.exports.update1 =async function(req, res){
    
    try{
        let user=await User.find({email:req.body.email}) 
        if(!user){
            res.status(501).json("Not Valid User")
        }
        else{
            User.uploadedAvatar(req,res,(err)=>{
                if(err){
                    console.log("Multer Error")
                }
                console.log(req.file)
                req.flash("success","Profile Pic Uploaded")
            })
        }
    }catch(err){
        console.log("Error in uploading profile",err)
        

    }
         
}  
        
        
   

module.exports.update =async function(req, res) {
    try{
        if(req.user.id == req.params.id){
            let user= await  User.findById(req.params.id); 
            User.UploadedAvatar(req,res,(err)=>{
                if(err){
                    console.log("Multer errror",err)
                }
                console.log(req.file)
                user.name=req.body.name;  
                user.email=req.body.email;
                if(req.file){
                    if(user.avatar)
                    {
                       // fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                       user.avatar=User.avatarPath+ '/' +req.file.filename;
                    }
                    //  fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                  
                }
              
                
                user.save()
                return res.redirect('back');
            })
            
        }else{
            console.log('error', 'Unauthorized!');
            return res.status(401).send('Unauthorized');
        }
    }catch(err){
        console.log ('error',err)
        return res.redirect('back')
    }
}
