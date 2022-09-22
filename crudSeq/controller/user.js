const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router()
//const jwt = require('jsonwebtoken');
var jwt = require('../authentication/JWT')
const db = require('../models')
const users = require("../models/user");
const user = require('../routes/user')
const Sequelize=require('sequelize')
const Op = Sequelize.Op;
// get all logins
const geo=require('geolib');
const { rmSync } = require('fs');

module.exports = {
    createUser: (req, res) => {
        db.user.create({
            email: req.body.email,
            password: req.body.password,
            RepeatPassword: req.body.RepeatPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            gender: req.body.gender,
          isActive:0
        }
        ).then(function (data) {
            var token = jwt.createToken(data.dataValues.id);
            res.json([{
                error: 0,
                
               // message:"please wait approval"
                 token: token

            }]);

        })

    }, verify: (req, res) => {
        res.send(req.token);
    },

    signUser: (req, res) => {
        db.user.findOne({
            where: {
                email: req.body.email,
                password: req.body.password
            },
            //attributes: ['id', 'firstname', 'lastname', 'age', 'gender']
        }).then(function (data) {
           if (data){
            var token=jwt.createToken(data.dataValues.id)
            res.json([{
                error: 0,
                token :token,
                id:data.dataValues,
            }]);
           }else{
            res.json({ error: 1, message: "authentication failed" });
           }
           // console.log("id" + data.dataValues.id);
           
            
            // console.log("data",data)
            // if (data === null) {
            //     
            // } else {
            //     if(data.dataValues.isActive===1){
            //         console.log("id" + data.dataValues.id);
            //         var token = jwt.createToken(data.dataValues.id);
            //         res.json([{
            //             error: 0,
            //             token: token,
            //             id: data.dataValues.id
            //         }]);
            //     }else{
            //         res.json([{
            //             error: 0,
                        
            //             message:"account is not activated"
            //             // token: token
        
            //         }]);
        
            //     }
               
            // }

        })

    },


    viewProfile: (req,res) => {
        console.log("resis",res)
        console.log("req.token",req.token)
        db.user.findByPk(req.token.id).then(function (data) {
            res.json([data])
        })

    },
    editProfile: (req, res) => {
        console.log(req.body)
        db.user.update(
            {
                email: req.body.email,
                password: req.body.password,
                RepeatPassword: req.body.RepeatPassword,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                age: req.body.age,
                gender: req.body.gender

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
    deleteAccount:(req,res)=>{
        console.log(req.token)
     db.user.destroy({
        where:{
            id:req.token.id
        }
     }
       
     ).then((data)=>{
         res.json(data)
     })
    },
    
    // viewLocation:(req,res)=>{
    //     db.user.findOne(
    //         {
    //             where:{
    //            id:req.token.id
    //             },
    //             attributes:['currentLatitude','currentLongitude']
    //         }
    //     ).then((data)=>{
    //         var latt = data.dataValues.currentLatitude
    //         var longg = data.dataValues.currentLongitude
    //        db.pharmacy.findOne(
    //            {
    //                where:{
                 
    //                }
    //            }
    //        ).then()
    //     })

    // },

//     viewdDrug:(req,res)=>{
//     db.user.findOne({
//    where:{
//        id:id.token.id
//    }

//     }).then((data)=>{
//         let id=data.dataValues.drugId
//        db.drug.findAll(
//            {
//                where:{
//                   drugId:id 
//                }
//            }
//        ).then((dta)=>{
//            res.json(dta)
//        }
//        )
//     })
//     },
    searchDrug:(req,res)=>{
        console.log("i was here")
        if(req.body.key.length>0){
            db.user.findOne(
                {
                    where:{
                        id:req.token.id
                    },
                 //   attributes: ['currentLatitude', 'currentLongitude']
                }
            ).then((data)=>{
               console.log("i was here2")
       
               var latt = req.body.currentLatitude
               var longg = req.body.currentLongitude
               console.log("mb",req.body)
               db.drug.findAll(
                  {
                      where:{
                       Drugname:{
                       [Op.like]:  '%'+req.body.key+'%'
                      },
                    //  isActive =1,
                      },
                   include:[
                       db.pharmacy
                   ]
                  }
               ).then((data)=>{
                   console.log("i was here3")
       
                       let drugs=data;
                       let distance=0;
                       for(var i=0;i<drugs.length;i++){
                           console.log("pharma",drugs[i].dataValues)
                           let dist=geo.getDistance(
                               {
                                   latitude:0,
                                   longitude:0
                               },{
                                       latitude:drugs[i].dataValues.pharmacy.currentLatitude,
                                       longitude:drugs[i].dataValues.pharmacy.currentLongitude
                               })
                               console.log("distance",dist)
                               drugs[i].pharmacy.dataValues['distance']=dist
                               drugs[i].dataValues['distance']=dist
       
                       }
                       console.log("res",JSON.stringify(drugs))
                   res.json(drugs)
               })
                
            })
        }else{
            res.json([])
        }
     
    },
    
    postFeedback:(req,res)=>{
        console.log(res.body)
     db.user.findOne(
         {
             where:{
                 id:req.token.id
             }
         }
     ).then((data)=>{
         let id=data.dataValues.feedbackId
         db.feedback.create(
             {
                where:{
                
                    message:req.body.message,
                
                 }
          
             }
             
         ).then((data)=>{
             res.json(data)
         })
     })
    },
   
    viewAlarm:(req,res)=>{
   db.user.findOne({
       where:{
           id:id.token.id
       }
   }).then((data)=>{
    let id=data.dataValues.alarmId
    db.alarm.findAll().then((data)=>{
        res.json(data)
    })
   
   })
    },
   
    payment:(req,res)=>{

    },
   
    addToCart:(req,res)=>{
        db.user.findOne({
            where:{
                id:id.token.id
            }
        }).then((data)=>{
            let id=data.dataValues.cartId
            db.cart.create(
               
            ).then((data)=>{
                res.json(data)
            })
        })

    },
   
    viewCart:(req,res)=>{
        db.user.findone({
            where:{
                id:id.token.id
            }
        }).then((data)=>{
            db.cart.findAll().then((data)=>{
                res.json(data)
            })
        })

    },
    // viewPopularProduct:()=>{

    // },
    
    }
/*
router.get('/all',(req,res)=>{
    db.login.findAll().then(data => res.send(data));

});
// get post new loginn 
router.post('/new',(req,res)=>{
    db.login.create({
        username:req.body.username
    }).then(saved =>res.send(saved) )
})
//find by id
router.get('/find/:id',(req,res)=>{
    db.login.findall({
        where :{
            id:req.param.id
        }
    }).then(search=>res.send(search))
})
// get update login
router.put('/edit/:id',(req,res)=>{
    db.login.update(
       {
        username:req.body.username
       },{
where:{
    id:req.body.id
}       }
    ).then(modify => res.send(modify))})
//delete request
router.delete('/del/:id',(req,res)=>{
    db.login.destroy({
   where:{
       id:req.params.id
   }

    }).then(dismiss => res.send(dismiss))
})
module.exports=router;*/