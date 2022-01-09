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
   console.log(req.body)
    const errors=validationResult(req)
    const {password,email}=req.body
    const alert=errors.array()
    if (req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }

    try {
        
        
        const newUser = new User({
          name:req.body.name,
         
          email: req.body.email,
          password:req.body.password,
        });
    
        const user = await newUser.save();
        
        res.redirect('sign-in');
        console.log(user)
      } catch (err) {
          console.log("error",err)
        res.redirect('back');
      }
    
}
    


exports.createSession =async  function(req, res){
 try{
     const user=await User.findOne({email:req.body.email})
     !user && res.status(404).json("User Not Found")
     
     console.log(user)
     res.redirect("/")
 }catch(err){
  console.log(err,"err")
 }
   
}
 
exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out!');
    
    
    return res.redirect('/');
}
exports.profile=(req,res)=>{
    res.render('profile',{title:'Profile | MyTube'})
}

module.exports.update1 =async function(req, res){
    
    
    if(req.user.id == req.params.id){
        try{
            let user= await  User.findById(req.params.id); 
            User.uploadedAvatar(req,res,(err)=>{
                if(err){
                    console.log("Multer errror",err)
                }
                user.name=req.body.name;  
                user.email=req.body.email;
                if(req.file){
                    if(user.avatar)
                    {
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    user.avatar=User.avatarPath+ '/' +req.file.filename;
                    
                }
                user.save()
                return res.redirect('back');
            })
            
            
        }catch(err){
            console.log ('error',err)
            return res.redirect('back')
        }
        
        
        
    }else{
        console.log('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
}
module.exports.update =async function(req, res) {
    try{
        if(req.user.id == req.params.id){
            let user= await  User.findById(req.params.id); 
            User.uploadedAvatar(req,res,(err)=>{
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
