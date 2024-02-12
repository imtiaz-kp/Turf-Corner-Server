const express = require("express")
const router= new express.Router()
const userController =require('../Controller/userController')
const jwtMiddleware=require('../Middlewares/jwtMiddleware')
const multerConfig = require("../Middlewares/multerMiddleware")

const turfController =require('../Controller/turfController')


//register
router.post('/user/register',userController.register)
//login
router.post('/user/login', userController.login)

router.post('/useradmin/register', userController.adminregister)

router.post('/useradmin/login', userController.adminlogin)

router.put('/profile/edit/',jwtMiddleware,multerConfig.single("profile"),userController.editProfileController)


router.put('/ownerprofile/edit/',jwtMiddleware,multerConfig.single("profile2"),userController.editOwnerProfileController)


router.get('/projects/all',jwtMiddleware,turfController.getallturfs)


router.put('/userprofile/edit/',jwtMiddleware,userController.editUserProfileController)

router.get('/turf/view/:id',jwtMiddleware,turfController.getAturf)


module.exports=router