
module.exports = (sequelize, DataTypes) => {

    const feedback = sequelize.define('feedback', {
        message:DataTypes.STRING,
        rating:DataTypes.INTEGER,
        date:DataTypes.INTEGER,
        read:DataTypes.STRING,

    });

    feedback.associate =models=>{
        feedback.belongsTo(models.admin)
        feedback.belongsTo(models.user)
    }
    return feedback;
    
};