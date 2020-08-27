const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')
const User = require('./user')
const db = require('./db');

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
  static async findAccount(accountNumber) {
    return Bank.findAll({
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

  static async findAllUser() {
    return Bank.findAll({
      include: [
        {
          model: User
        }
      ],
    })
  }
  static async findEmail(temp) {
    return Bank.findAll({
      include: [
        {
          model: User,
          where: {
            email: temp
          }  
        
      }
      ],
    })
  }

  static async findCmnd(temp) {
    return Bank.findAll({
      include: [
        {
          model: User,
          where: {
            CMND: temp
          }  
        
      }
      ],
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

module.exports = Bank;