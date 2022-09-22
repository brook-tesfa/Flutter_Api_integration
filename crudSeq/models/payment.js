const { DATE } = require("sequelize");

module.exports = (sequelize, DataTypes) => {

    const payment = sequelize.define('payment', {
       price:DataTypes.INTEGER,

      });

    payment.associate =models=>{
        
        payment.belongsTo(models.user)
        
    }

    return payment;
    
};