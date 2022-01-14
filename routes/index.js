const router=require('express').Router()
const passport=require('passport')

const path=require('path')
const {check,validationResult}=require('express-validator')

const homecontroller=require('../controllers/homecontroller')

 router.get('/' ,passport.checkAuthentication,homecontroller.home)
 router.get('/sign-in',homecontroller.signin)
router.get('/sign-up',homecontroller.signup)
router.post('/create',[
    check('username','This username should be 3+characters'
    )
    .exists()
    .isLength({min:3}),
    check('email','Email is not valid')
    .isEmail()
    .normalizeEmail()
],homecontroller.create)
router.post('/createSession',passport.authenticate(
    'local',
    {failureRedirect: '/sign-in',
    successFlash:true,
    failureFlash:true,

},
),homecontroller.createSession)
router.get('/sign-out',homecontroller.destroySession)
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}))
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/sign-in'}),homecontroller.createSession)
router.get('/profile/:id',homecontroller.profile)
router.post('/update1',homecontroller.update1)
router.post("/update/:id",passport.checkAuthentication,homecontroller.update)
 

module.exports=router