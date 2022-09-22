
module.exports = (sequelize, DataTypes) => {

    const login = sequelize.define('login', {
        email: DataTypes.TEXT,
      
        password:DataTypes.STRING, 

        Account_type:DataTypes.STRING,

    });

    return login;
    
};