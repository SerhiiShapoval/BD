// models/comment.js

const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Comment = sequelize.define('Comment', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  }
}, {})

Comment.associate = models => {
  Comment.belongsTo(models.User, { foreignKey: 'userId' })
  Comment.belongsTo(models.Ad, { foreignKey: 'adId' })
}

module.exports = Comment
