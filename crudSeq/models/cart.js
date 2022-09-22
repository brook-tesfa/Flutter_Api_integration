module.exports = (sequelize, DataTypes) => {

    const cart = sequelize.define('cart', {
      

    });

    cart.associate = models => {
        cart.belongsTo(models.user)
        cart.belongsTo(models.drug)
        cart.belongsTo(models.payment)
    }
    return cart;

};