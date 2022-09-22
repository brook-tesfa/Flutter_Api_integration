const express = require('express');
//const { where } = require('sequelize/types');
const router = express.Router()
const db = require('../models')
const users = require("../models/admin");
const user = require('../routes/admin')
var jwt = require('../authentication/JWT')
module.exports = {

    signAdmin: (req, res) => {
        db.admin.findOne({
            where: {
                email: req.body.email,
                password: req.body.password
            },
            attributes: ['id', 'firstname', 'lastname']
        }).then(function (data) {
            if (data == null) {
                res.json({ error: 1, message: "authentication failed" });
            } else {
                console.log("id" + data.dataValues.id);
                var token = jwt.createToken(data.dataValues.id);
                res.json([{
                    error: 0,
                    token: token,
                    id: data.dataValues.id
                }]);
            }

        })


    },
    createAdmin: (req, res) => {
        db.admin.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,

            email: req.body.email,
            password: req.body.password

        }
        ).then(function (data) {
            var token = jwt.createToken(data.dataValues.id);
            res.json([{
                error: 0,
                id: data.dataValues.id,
                token: token

            }]);

        })


    },
    viewPharmacy: (req, res) => {
        db.admin.findOne({
            where: {
                id: req.token.id
            }
        }).then((data) => {
            console.log("data",data.dataValues)
            let id =data.dataValue.pharmacyId 
            db.pharmacy.findAll(
              
            ).then((data) => {
                res.json(data)
            })
        })

    },
   
    getFeedback: (req, res) => {
        db.admin.findOne({
            where: {
                id: req.token.id
            }
        }).then((data) => {
            //let id = data.dataValue.feedbackId
            db.feedback.findAll(
               
            ).then((data) => {
                res.json(data)
            })
        })

    },
    // mostSearchdDrug: (req, res) => {


    // },

    DisablePharma: (req, res) => {
        db.admin.findOne(
            {
                where: {
                    id: req.token.id
                }
            }
        ).then((data) => {
            db.pharmacy.update(
                {
                    isActive: req.body.isActive
                },
                {
                    where: {
                        id: req.body.pharmacyId
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
    UpdateAdmin:(req,res)=>{
        db.admin.update(
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
    
                email: req.body.email,
                password: req.body.password
    
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

    LoadAdmin: (req,res) => {
        console.log("resis",res)
        console.log("req.token",req.token)
        db.admin.findByPk(req.token.id).then(function (data) {
            res.json([data])
        })

    },


}