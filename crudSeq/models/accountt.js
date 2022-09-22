const { DATE } = require("sequelize");

module.exports = (sequelize, DataTypes) => {

    const account = sequelize.define('account', {
       accountNumber:DataTypes.INTEGER,

      });

    account.associate =models=>{
        
        account.hasOne(models.user)
        account.hasOne(models.pharmacy)
        
    }

    return account;
    
};