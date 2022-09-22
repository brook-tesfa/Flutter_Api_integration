const express = require('express');
const router = express.Router()
const db = require('../models')
const users = require("../models/pharmacist");
var jwt = require('../authentication/JWT');
const { Op } = require('sequelize');
const fs=require('fs')
module.exports = {

    createPharmacist: (req, res) => {
        console.log(req.body)
        console.log(req.token)

        db.pharmacist.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            PhoneNumber: req.body.PhoneNumber,
            email: req.body.email,
            password: req.body.password,
            pharmacyId: req.body.pharmacyId,
            isActive: 1,

        }).then(function (data) {
           // console.log("photosi",req.file)
            var token = jwt.createToken(data.dataValues.id);
         //   fs.readFile(req.file.path,(e,d)=>{
         //       fs.writeFileSync(`profile/profile${data.dataValues.id}.jpg`,Buffer.from(d))
        //     fs.unlinkSync(req.file.path)

          //  })
            res.json([{
                error: 0,
                id: data.dataValues.id,
                token:token
              //  message: "Please Wait Approval"

            }]);

        })
    },
    uploadImage:(req,res)=>{
console.log("reqbody",req.file)
fs.readFile(req.file.path,(e,d)=>{ //reading
    fs.writeFileSync(`profile/profile12.jpg`,Buffer.from(d)) //writes new file and renames
    fs.unlinkSync(req.file.path) //deletes temp file

})
res.json("")
    },
    signPharmacist: (req, res) => {
        console.log("reqbody",req.body)
        db.pharmacist.findOne({
            where: {
                email: req.body.email,
                password: req.body.password

            },
           // attributes: ['id', 'firstname', 'lastname', 'PhoneNumber',]
        }

        ).then(function (data) {
            if (data == null) {
                res.json({ error: 1, message: "authentication failed" });
            } else {

                if (data.dataValues.isActive == 1) {
                    console.log("id" + data.dataValues.id);
                    var token = jwt.createToken(data.dataValues.id);
                    res.json([{
                        error: 0,
                        token: token,
                        id: data.dataValues.id
                    }]);
                } else {
                    res.json([{
                        error: 0,
                        id: data.dataValues.id,
                        message: "Please Wait Approval"

                    }]);
                }
            }

        })
    },

    drugList: (req, res) => {
        db.pharmacist.findOne({
            where: {
                id: req.token.id
            }
        }).then((data) => {
            let id = data.dataValues.pharmacyId
            db.drug.findAll({
                where: {
                    pharmacyId: id
                }
            }).then((data) => {
                // let dat=[]
                // for(var i=0;i<data.length;i++){
                //     if(moment().diff(moment(data[i].dataValues.expDate),'days')<0){
                //         dat.push(data[i])
                //     }
                // }
                res.json(data)
            })
        })


    },

    addDrug: (req, res) => {
        console.log(req.body)
            console.log(req.token)
        db.pharmacist.findOne({
            where: {
                id: req.token.id
            }
        }).then((data) => {
            
            console.log("data", data.dataValues)
            let id = data.dataValues.pharmacyId
            db.drug.create({
                pharmacyId: id,
                Drugname: req.body.Drugname,
                manufactureDate: req.body.manufactureDate,
                expDate: req.body.expDate,
                price: req.body.price,
                Quantity:req.body.Quantity,
                drugDescription: req.body.drugDescription,
                isActive: 1

            }).then((data) => {

                // fs.readFile(req.file.path,(e,d)=>{
                //     fs.writeFileSync(`drugimage/drug${data.dataValues.id}.jpg`,Buffer.from(d))
                //     fs.unlinkSync(req.file.path)
    
                // })
               // res.json(data)
      let id = data.dataValues.pharmacyId
       var token = jwt.createToken(data.dataValues.id);
        res.json([{
            error: 0,
            id: data.dataValues.id,
       token: token

        }]);
            })
        })
    },
    // veiwTransaction:(res,req)=>{

    // },
    editDrug: (req, res) => {
        db.pharmacist.findOne({
            where: {
                id: req.token.id
            }
        }).then((data) => {
            //  let id=data.dataValues.drugId
            db.drug.update(
                {
                    Drugname: req.bod.Drugname,
                    manufactureDate: req.bod.manufactureDate,
                    expDate: req.bod.expDate,
                    price: req.bod.price,
                    Quantity:req.body.Quantity,
                    drugDescription: req.bod.drugDescription,
                },
                {
                    where: {
                        id: req.body.drugId
                    }
                }
            ).then((data) => {
                res.json(data)
            })
        })

    },

    
    disableEnable: (req, res) => {
        db.pharmacist.findOne({
            where: {
                id: req.token.id
            }
        }).then((data) => {
            //  let id=data.dataValues.drugId
            db.drug.update(

                {
                    isActive: req.body.isActive
                },
                {

                    where: {
                        id: req.token.drugId
                    }
                }
            ).then((data) => {
                if(data.dataValues,isActive==1){
                    res.json([
                        {
                       
             messsage:"Allowed Drug"
                        }])
                }else{
                    res.json([
                        {
                       
             messsage:"unallowed Drug"
                        }])
                }
               
            })
        })
    },
    searchedDrug: (req, res) => {
        db.pharmacist.findOne({
            where: {
                id: req.token.id
            }
        }).then((data) => {
            //  let id=data.dataValues.drugId
            db.drug.findOne(
                {
                    where: {
                        Drugname:{
                            [Op.like]:  '%'+req.body.key+'%'
                        }
                    }
                }
            ).then((data) => {
                res.json(data)
            })
        })

    },
    UpdatePharmacist:(req,res)=>{
        db.pharmacist.update( {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            PhoneNumber: req.body.PhoneNumber,
            email: req.body.email,
            password: req.body.password

        },
        {
            where: {
                id: req.token.id
            }
        }).then((data)=>{
            res.json(data)
        })
    }
    // uploadDrugimage:(res,req)=>{

    // }

}