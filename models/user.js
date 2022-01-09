const mongoose = require('mongoose');
const jwt=require('jsonwebtoken')
const path=require("path")
const multer=require('multer')
const bcrypt=require('bcrypt')
const AVATAR_PATH=path.join('/uploads/Avatars')
const userSchema = new mongoose.Schema({
    email: {
        type: String,
         required:true,  
          unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar:{
        type:String,
    },
    

    name: {
        type: String,
        required:true
        },
  
    tokens:[{
        token:{
            type:String,
            
        }
    }]
   
    
}, {
    timestamps: true
});

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'..',AVATAR_PATH))
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now())

    }
})

// Generating Token
userSchema.methods.generateAuthToken=async function(){
    try{
        // using id becoz it is unique for every user
       let token=jwt.sign({_id:this._id},'MyTube')
       this.tokens=this.tokens.concat({token:token})
       await this.save()
       return token;
    }catch(err){
        console.log(err)
    }

}

userSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');
userSchema.statics.avatarPath=AVATAR_PATH;
const User = mongoose.model('User', userSchema);

module.exports = User;