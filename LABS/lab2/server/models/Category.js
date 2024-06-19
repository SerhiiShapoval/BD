// models/category.js

const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Category = sequelize.define('Category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
}, {})

Category.associate = models => {
  Category.hasMany(models.Ad, { foreignKey: 'categoryId' })
}

module.exports = Category
