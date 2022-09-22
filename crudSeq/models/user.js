

module.exports = (sequelize, DataTypes) => {

    const user = sequelize.define('user', {
        email: DataTypes.TEXT,
        password:DataTypes.STRING,
        RepeatPassword:  DataTypes.STRING,
        firstName:DataTypes.STRING, 
        lastName:DataTypes.STRING, 
        age:DataTypes.INTEGER ,
        gender:DataTypes.STRING,
        isActive:DataTypes.INTEGER
       
    });

    return user;

};