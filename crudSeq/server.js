const { urlencoded } = require('express');
const express=require('express');
//const pharmacistcon = require('./controller/pharmacistcon');
//const pharmacycon = require('./controller/pharmacycon');
const app= express();
const db= require('./models');
const user=require('./routes/user')
const admin=require('./routes/admin')
var pharmacistRoute=require('./routes/pharmacistRoute')
var pharmacyRoutes=require('./routes/pharmacyRoutes')



const apiRoute= require('./routes/user');
const Port = process.env.Port || 3000

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT', 'POST', 'GET');
        return res.status(200).json({});
    }
    next();
});
app.get("/synctable",(req,res)=>{
    db.sequelize.sync().then(()=>{
        res.json({message:"finished"})
        
    });
})
app.get("/droptable",(req,res)=>{
    db.sequelize.drop().then(()=>
    {
        res.json({message:"dropped"})
    })
})
app.use(express.static('drugimage'));
app.use(express.static('profile'));
app.use("/api",user)
app.use("/api",admin)
app.use("/api",pharmacistRoute)
app.use("/api",pharmacyRoutes)

app.listen(Port ,()=>{
    console.log("Listening on: http://localhost:${Port}");
})

