const Sequelize = require('sequelize')
const User = require('./user')
const db = require('./db')

const Model = Sequelize.Model;
class Transaction extends Model {
    static async findTransactionByCode(code){
        return Transaction.findOne({
              where:{
                  code,
              }
          })
      }

}
Transaction.init({
    // attributes
    code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    accuontSender: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    accountReceiver: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    nameReceiver: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Money: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    date: {
        type: Sequelize.STRING,
    },
    content:
    {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    charge:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    status: {
        type: Sequelize.TEXT,
        allowNull: false,
    }

}, {
    sequelize: db,
    modelName: 'transaction'
});

User.hasMany(Transaction);
Transaction.belongsTo(User);

module.exports = Transaction