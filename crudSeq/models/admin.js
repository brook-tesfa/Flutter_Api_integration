const { DATE } = require("sequelize");

module.exports = (sequelize, DataTypes) => {

    const admin = sequelize.define('admin', {
       firstName:DataTypes.STRING,
       lastName:DataTypes.STRING,
     //  PhoneNumber:DataTypes.STRING,
       email:DataTypes.STRING,
       password:DataTypes.STRING
        
    });

    admin.associate =models=>{
        
        admin.hasOne(models.login)
        admin.hasMany(models.pharmacy)
    }

    return admin;
    
};