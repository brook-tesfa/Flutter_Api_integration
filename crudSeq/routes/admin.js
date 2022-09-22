const express=require('express')
const router = express.Router()
var token = require('../authentication/JWT')
const db=require('../models')
var pharmacycontroller=require('../controller/pharmacycon')
var controller = require('../controller/admin');



router.post('/signinadmin',controller.signAdmin)
router.post('/createAdmin',controller.createAdmin)
router.post('/registerPharmacy',pharmacycontroller.Registerpharmacy)
router.get('/viewPharmacy',token.verifyToken,controller.viewPharmacy)
router.post('/updateAdmin',token.verifyToken,controller.UpdateAdmin)
router.post('/loadAdmin',token.verifyToken,controller.LoadAdmin)
//router.get('/listPharmacy',controller.listPharmacy)
//router.delete('/deletePharmacy',token.verifyToken,controller.deletePharmacy)
router.get('/getFeedback',token.verifyToken,controller.getFeedback)
router.post('/disablepharma',token.verifyToken,controller.DisablePharma)
//router.post('/EnablePharmacy',token.verifyToken,controller.EnablePharma)
//router.get('/mostSearchdDrug',token.verifyToken,controller.mostSearchdDrug)

module.exports=router;