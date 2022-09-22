
module.exports = (sequelize, DataTypes) => {

    const pharmacy = sequelize.define('pharmacy', {
        pharmacyName: DataTypes.STRING,
        pharmacyAddress: DataTypes.STRING,
        bankAccount:DataTypes.STRING,
      //  PhoneNumber:DataTypes.STRING,
        //email:DataTypes.STRING,
        currentLatitude: DataTypes.FLOAT,
        currentLongitude: DataTypes.FLOAT,
        isActive :DataTypes.INTEGER,



    });
    pharmacy.associate =models=>{
       pharmacy.hasMany(models.categories)
        pharmacy.hasMany(models.pharmacist)
       pharmacy.hasMany(models.drug)
       //pharmacy.belongsTo(models.admin)
    }

    return pharmacy;
    
};