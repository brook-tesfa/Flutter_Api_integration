
module.exports = (sequelize, DataTypes) => {

    const drug = sequelize.define('drug', {
        Drugname: DataTypes.TEXT,
        manufactureDate: DataTypes.STRING,
        expDate: DataTypes.STRING,
        price: DataTypes.FLOAT,
        Quantity:DataTypes.INTEGER,
        drugDescription: DataTypes.STRING,
        isActive:DataTypes.INTEGER


    });
   drug.associate= models=>{
       drug.belongsTo(models.user)
       drug.belongsTo(models.pharmacy)
   }
    return drug;

};