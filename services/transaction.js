const Sequelize = require('sequelize');
const User = require('./user');
const db = require('./db');

const Model = Sequelize.Model;
const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));
class Transaction extends Model {
    static async findTransactionByCode(code){
        return Transaction.findOne({
              where:{
                  code,
              },
            
          })
      }
    static async findAllHistory(userId)
    {
        return Transaction.findAll({where: {
            userId,
            status: "Giao dịch thành công"
        },
        order: [ 
            ['date', 'DESC'], 
           ], 
    })
    }

    static async findAllInDay(userId)
    {
        return Transaction.findAll({
            where: {
                date:{
                    $gt: sevenDaysAgo,
                    $lt: new Date(),
            }
        }})
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
        type: Sequelize.DATE,
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
    code: {
        type: Sequelize.STRING,
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