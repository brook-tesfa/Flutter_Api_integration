var express = require('express')
var token = require('../authentication/JWT')
var multer=require('multer')
//var upload = multer({ dest: './profile' });
var controller = require('../controller/pharmacycon')
var pharmacistController=require('../controller/pharmacistcon')
const { route } = require('./commonroute');
var router = express.Router();
// var middlewareMult={
//     images:upload.single('images')
// }
//router.post('/signin',controller.signpharmacist)
router.post('/Register',controller.Registerpharmacy)
router.post('/updatePharmacy',token.verifyToken,controller.UpdatePharmacy)
router.post('/addPharmacist',token.verifyToken,pharmacistController.createPharmacist)
router.post('/Enablepharma',token.verifyToken,controller.EnablePharma)
router.post('/listpharmacy',controller.listPharmacy)

//router.post('/purchaseInfo',token.verifyToken,controller.purchaseInfo)


module.exports=router