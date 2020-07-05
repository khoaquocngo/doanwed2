const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')
const db = require('./db')

console.log(db);
const Model = Sequelize.Model;
class User extends Model {
    static async findUserById(id){
        return User.findByPk(id)
    }
    static async findUserByEmail(email){
      return User.findOne({
            where:{
                email,
            }
        })
    }
    static hassPassword(password){
        return bcrypt.hashSync(password,10);
    }
    static verifyPassword(passwordHash,password)
    {
        return bcrypt.compareSync(passwordHash,password)
    }
}
User.init({
  // attributes
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique:true
  },
  displayName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  token:{
    type:Sequelize.STRING,
  }
}, {
  sequelize: db,
  modelName: 'user'
});
module.exports = User