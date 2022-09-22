const express=require('express')
const router = express.Router()
var token = require('../authentication/JWT')
const db=require('../models')
var controller = require('../controller/user');
const { route } = require('express/lib/application');
const { verifyToken } = require('../authentication/JWT');




router.post('/signIn',controller.signUser)
router.post('/createUser',controller.createUser)
router.get('/viewProfile',token.verifyToken,controller.viewProfile)
router.post('/editProfile',token.verifyToken,controller.editProfile)
router.delete('/deleteAccount/:id',token.verifyToken,controller.deleteAccount)

router.post('/searchDrug',token.verifyToken,controller.searchDrug)
//router.get('/viewLocation',token.verifyToken,controller.viewLocation)
//router.get('/viewDrug',token.verifyToken,controller.viewdDrug)
router.post('/postFeedback',token.verifyToken,controller.postFeedback)
router.get('/viewAlarm',token.verifyToken,controller.viewAlarm)
router.post('/payment',token.verifyToken,controller.payment)
router.post('/addToCart',token.verifyToken,controller.addToCart)
router.get('/viewCart',token.verifyToken,controller.viewCart)
//router.get('/viewPopularProduct',token.verifyToken,controller.viewPopularProduct)






module.exports=router