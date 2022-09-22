const { DATE } = require("sequelize");

module.exports = (sequelize, DataTypes) => {

    const alarm = sequelize.define('alarm', {
       setTime:DataTypes.INTEGER,

      });
        
      alarm.associate = models=>{
        alarm.belongsTo(models.user)
    }

    return alarm;
    
};