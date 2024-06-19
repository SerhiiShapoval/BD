// models/ad.js

const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Ad = sequelize.define('Ad', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
}, {})

Ad.associate = models => {
  Ad.belongsTo(models.User, { foreignKey: 'userId' })
  Ad.belongsTo(models.Category, { foreignKey: 'categoryId' })
  Ad.hasMany(models.Comment, { foreignKey: 'adId' })
  Ad.belongsToMany(models.Tag, { through: 'AdTags', foreignKey: 'adId' })
}

module.exports = Ad