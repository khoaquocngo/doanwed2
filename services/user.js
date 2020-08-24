const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')
const db = require('./db')

const Model = Sequelize.Model;
class User extends Model {
  static async findUserById(id) {
    return User.findByPk(id)
  }
  static async CreateManage(displayName,email, password) {
    return User.create(
      {
        displayName,
        email,
        password,
        decentralize: 2,
        block: false,
      }
    )
  }
  static async findManage() {
    return User.findAll(
      {
        where: {
          decentralize: 2
        },
      }
    )
  }
  static async findGuest() {
    return User.findAll(
      {
        where: {
          decentralize: 1
        },
      }
    )
  }
  static async findUserByEmail(email) {
    return User.findOne({
      where: {
        email,
      }
    })
  }

  static async updateUserProfile(id, displayName, CMND,pictureCMND) {
    return User.update(
      {displayName: displayName,CMND: CMND,pictureCMND: pictureCMND},
      {where: {
        id: id,
      }
    })
  }

  static hassPassword(password) {
    return bcrypt.hashSync(password, 10);
  }
  static verifyPassword(password, passwordHash) {
    return bcrypt.compareSync(password, passwordHash)
  }
}
User.init({
  // attributes
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  displayName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  codeForgot:
  {
    type: Sequelize.STRING,

  },
  token: {
    type: Sequelize.STRING,
  },
  code: {
    type: Sequelize.STRING,
  },
  CMND: {
    type: Sequelize.STRING,

  },
  codeCMND: {
    type: Sequelize.STRING,

  },
  //defaut admin: 0, guest: 1,  manage: 2
  decentralize:
  {
    type: Sequelize.INTEGER,
    allowNull: false,

  },
  pictureCMND: {
    type: Sequelize.TEXT,

  },
  block: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },

}, {
  sequelize: db,
  modelName: 'user'
});
module.exports = User