const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')
const User = require('./user')
const db = require('./db')

const Model = Sequelize.Model;
class Bank extends Model {
  static async findBankbyuserId(userId) {
    return Bank.findOne({
 
      where: {
        userId,
      }
    })
  }

  

  static async findBankbyaccountNumber(accountNumber) {
    return Bank.findOne({
      include: [
        {
          model: User
        }
      ],
      where: {
        accountNumber,
      }
    })
  }


}
Bank.init({
  // attributes

  accountNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  defaultMoney: {
    type: Sequelize.DOUBLE,
    defaultValue: 0,
  },
}, {
  sequelize: db,
  modelName: 'bank'
});

User.hasMany(Bank);
Bank.belongsTo(User);

module.exports = Bank