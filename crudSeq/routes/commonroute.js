const express=require('express')
const router = express.Router()
var token = require('../authentication/JWT')
const db=require('../models')
var fs = require('fs');

//router.post('/uploadProfile', token.verifyToken, controller.uploadImage);

module.exports=router;