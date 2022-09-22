const express = require('express');

const router = express.Router()
const db = require('../models')
const users = require("../models/pharmacy");
//const user = require('../routes/pharmacyRoutes')
var geolib=require('geolib')
var jwt = require('../authentication/JWT')

module.exports = {
    Registerpharmacy:(req,res)=>{
        console.log(req.body)
       db.pharmacy.create(
           {
            pharmacyName: req.body.pharmacyName,
            pharmacyAddress: req.body.pharmacyAddress,
            bankAccount:req.body.bankAccount,
            
            currentLatitude: req.body.currentLatitude,
            currentLongitude: req.body.currentLongitude,
            isActive:0,
             }
       ).then((data)=>{
        var token = jwt.createToken(data.dataValues.id);
        res.json([{
            error: 0,
            id: data.dataValues.id,
            token: token

        }]);
       })
    },
    UpdatePharmacy:(req,res)=>{
        console.log(req.body)
        db.pharmacy.update(
            {
                pharmacyName: req.body.pharmacyName,
                pharmacyAddress: req.body.pharmacyAddress,
                bankAccount:req.body.bankAccount,
                
                currentLatitude: req.body.currentLatitude,
                currentLongitude: req.body.currentLongitude,
            },
            {
                where: {
                    id: req.token.id
                }
            }

        ).then((data)=>{
            res.json(data)

        })

    },

    AddPharmacist:(req,res)=>{
     console.log(req,body)


    },
    EnablePharma: (req, res) => {
        db.pharmacy.findOne(
            {
                where: {
                    id: req.token.id
                }
            }
        ).then((data) => {
            db.pharmacist.update(
                {
                    isActive: req.body.isActive
                },
                {
                    where: {
                        id: req.body.pharmacistId
                    }
                }

            ).then((data) => {
                if (req.body.isActive != 1) {
                    res.json(
                        [{ message: "Enabled" }]

                    )
                } else {
                    res.json(
                        [{ message: "Disbled" }]

                    )
                }
            })
        })

    },
    listPharmacy:(req,res)=>{
        db.pharmacy.findAll(
           
        ).then((data)=>{
            res.json(data)
        })
    }
   
   


    // signpharmacist:(res,req)=>{

    // },
    // getPayment:(res,req)=>{

    // },
    // druglist:(res,req)=>{

    // },
    // Adddrug:(res,req)=>{

    // },
    // veiwTransaction:(res,req)=>{

    // },
    // editDrug:(res,req)=>{

    // },
    // deleteDrug:(res,req)=>{

    // },
    // searchedDrug:(res,req)=>{

    // }



}