const Sequelize = require('sequelize')

const sequelize = require('../util/database')


const User = sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {})

User.associate = models => {
  User.hasMany(models.Ad, { foreignKey: 'userId', onDelete: 'CASCADE' })
  User.hasMany(models.Comment, { foreignKey: 'userId' })
}

// models/user.js
module.exports = User

