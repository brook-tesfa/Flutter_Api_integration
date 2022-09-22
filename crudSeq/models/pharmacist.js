const { DATE } = require("sequelize");

module.exports = (sequelize, DataTypes) => {

    const pharmacist = sequelize.define('pharmacist', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        PhoneNumber: DataTypes.STRING,
        email: DataTypes.STRING,
        password:DataTypes.STRING,
        isActive:DataTypes.INTEGER

    });

    pharmacist.associate = models => {
         pharmacist.hasMany(models.categories)
        pharmacist.hasOne(models.login)
        pharmacist.belongsTo(models.pharmacy)
        
    }

    return pharmacist;

};