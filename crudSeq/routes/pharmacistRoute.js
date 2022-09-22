var express = require('express')
var token = require('../authentication/JWT')
var controller = require('../controller/pharmacistcon');
const { route } = require('./commonroute');
var router = express.Router();
// var middlewareMult={
//     images:upload.single('images')
// }
const multer=require('multer')
var upload = multer({ dest: './profile' });
router.post('/signinp',controller.signPharmacist)
router.post('/create',controller.createPharmacist)
router.get('/listdrug',token.verifyToken,controller.drugList)
router.post('/adddrug',token.verifyToken,controller.addDrug)
//router.get('/viewTransaction',token.verifyToken,controller.veiwTransaction)
router.put('/editDrug',token.verifyToken,controller.editDrug)
router.delete('/deleteDrug',token.verifyToken,controller.disableEnable)
router.post('/updatepharmacist',token.verifyToken,controller.UpdatePharmacist)
//router.get('/mostSearchdDrug'.token.verifyToken,controller.searchedDrug)
// router.post('/uploadDrugimage',[upload.single('images'),token.verifyToken],controller.uploadDrugimage)
//router.post('/upload',upload.single("image"),controller.uploadImage)

module.exports = router