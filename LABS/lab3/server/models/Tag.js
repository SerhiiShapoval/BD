// models/tag.js
const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Tag = sequelize.define('Tag', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
}, {})

Tag.associate = models => {
  Tag.belongsToMany(models.Ad, { through: 'AdTags', foreignKey: 'tagId' })
}


module.exports = Tag
