
module.exports = (sequelize, DataTypes) => {

    const categories = sequelize.define('categories', {
        catagoryName:  DataTypes.TEXT,
        password: DataTypes.STRING,

    });
    
    categories.associate = models=>{
        categories.hasMany(models.drug)
    }
    return categories;
    
};