const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database')
const { QueryTypes } = require('sequelize');
const app = express();
app.use(bodyParser.json()); // application/json;
app.use(express.static(path.join(__dirname, 'public')));

const Ad = require('./models/Ad');
const Category = require('./models/Category');
const Comment = require('./models/Comment');
const Tag = require('./models/Tag');
const User = require('./models/User');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Отримати всі користувачі
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Отримати всі категорії
app.get('/categories', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Отримати всі оголошення
app.get('/ads', async (req, res) => {
  try {
    const ads = await Ad.findAll({
      include: [User, Category, Tag]
    });
    res.json(ads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Отримати всі коментарі
app.get('/comments', async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Отримати всі теги
app.get('/tags', async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Створити нового користувача
app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Створити нову категорію
app.post('/categories', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Створити нове оголошення
app.post('/ads', async (req, res) => {
  try {
    const ad = await Ad.create(req.body);
    res.status(201).json(ad);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Створити новий коментар
app.post('/comments', async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Створити новий тег
app.post('/tags', async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Об’єднання таблиць: Отримати оголошення з користувачами та категоріями
app.get('/ads-with-details', async (req, res) => {
  try {
    const ads = await sequelize.query(`
      SELECT ads.title, ads.description, ads.price, users.username, categories.name AS category
      FROM Ads ads
      JOIN Users users ON ads.userId = users.id
      JOIN Categories categories ON ads.categoryId = categories.id
    `, {
      type: QueryTypes.SELECT
    });
    res.json(ads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Фільтрація: Отримати оголошення з ціною вище вказаної
app.get('/ads-by-price', async (req, res) => {
  try {
    const minPrice = req.query.minPrice || 0;
    const ads = await sequelize.query(`
      SELECT * FROM Ads WHERE price > :minPrice
    `, {
      type: QueryTypes.SELECT,
      replacements: { minPrice }
    });
    res.json(ads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Агрегатні функції: Отримати кількість оголошень для кожної категорії
app.get('/ad-count-by-category', async (req, res) => {
  try {
    const counts = await sequelize.query(`
      SELECT categories.name, COUNT(ads.id) AS adCount
      FROM Categories categories
      LEFT JOIN Ads ads ON categories.id = ads.categoryId
      GROUP BY categories.name
    `, {
      type: QueryTypes.SELECT
    });
    res.json(counts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function addRelations () {
  Ad.belongsTo(User, { foreignKey: 'userId' })
  Ad.belongsTo(Category, { foreignKey: 'categoryId' })
  Ad.hasMany(Comment, { foreignKey: 'adId' })
  Ad.belongsToMany(Tag, { through: 'AdTags', foreignKey: 'adId' })

  Category.hasMany(Ad, { foreignKey: 'categoryId' })

  Comment.belongsTo(User, { foreignKey: 'userId' })
  Comment.belongsTo(Ad, { foreignKey: 'adId' })

  Tag.belongsToMany(Ad, { through: 'AdTags', foreignKey: 'tagId' })

  User.hasMany(Ad, { foreignKey: 'userId' })
  User.hasMany(Comment, { foreignKey: 'userId' })
}

addRelations()

sequelize
  // .sync({force: true/*эта настройка позволит обновить данные в таблицах*/ })
  .sync()
  .then((result) => {
    console.log(result)
    app.listen(5000)
  })
  .catch(err => {
    console.log(err)
  })
