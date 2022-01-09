const mongoose = require('mongoose');
const multer = require('multer');
const path=require("path")
const AVATAR_PATH=path.join('/uploads/avatars')



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



let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,"..",AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
// // Generating Token
// userSchema.methods.generateAuthToken=async function(){
//     try{
//         // using id becoz it is unique for every user
//        let token=jwt.sign({_id:this._id},'MyTube')
//        this.tokens=this.tokens.concat({token:token})
//        await this.save()
//        return token;
//     }catch(err){
//         console.log(err)
//     }

// }

userSchema.statics.UploadedAvatar=multer({
    storage,
    fileFilter:(req,file,cb)=>{
        if(
            file.mimetype=='image/png' ||
            file.mimetype=='image/jpg' || 
            file.mimetype=='image/jpeg'
        ){
            cb(null,true)
        }else{
            cb(null,false)
            return cb(new Error("Sorry You cannot Upload it"))
        }
    },
    

}).single('avatar')
userSchema.statics.avatarPath=AVATAR_PATH;

const User = mongoose.model('User', userSchema);

module.exports = User;