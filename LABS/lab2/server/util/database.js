const Sequelize = require('sequelize')

const sequelize = new Sequelize('olx', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost'
})

module.exports = sequelize
