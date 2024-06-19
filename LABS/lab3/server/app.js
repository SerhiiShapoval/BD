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

app.get('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId); // findByPk - метод Sequelize для пошуку запису за первинним ключем (id)

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user); // Повертаємо користувача у відповідь
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/categories/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/ads/:id', async (req, res) => {
  try {
    const adId = req.params.id;
    const ad = await Ad.findByPk(adId);

    if (!ad) {
      return res.status(404).json({ error: 'Ad not found' });
    }

    res.json(ad);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/comments/:id', async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/tags/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    const tag = await Tag.findByPk(tagId);

    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }

    res.json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Знаходимо користувача за його userId
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Видаляємо користувача
    await user.destroy({ include: [Ad] });

    res.status(204).send(); // Відповідь з кодом 204 (No Content) після успішного видалення
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/categories/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    
    // Знаходимо категорію за її ID
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Видаляємо категорію
    await category.destroy();

    res.status(204).send(); // Відповідь з кодом 204 (No Content) після успішного видалення
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/ads/:id', async (req, res) => {
  try {
    const adId = req.params.id;
    
    // Знаходимо оголошення за його ID
    const ad = await Ad.findByPk(adId);

    if (!ad) {
      return res.status(404).json({ error: 'Ad not found' });
    }

    // Видаляємо оголошення
    await ad.destroy();

    res.status(204).send(); // Відповідь з кодом 204 (No Content) після успішного видалення
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/comments/:id', async (req, res) => {
  try {
    const commentId = req.params.id;
    
    // Знаходимо коментар за його ID
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Видаляємо коментар
    await comment.destroy();

    res.status(204).send(); // Відповідь з кодом 204 (No Content) після успішного видалення
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/tags/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    
    // Знаходимо тег за його ID
    const tag = await Tag.findByPk(tagId);

    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }

    // Видаляємо тег
    await tag.destroy();

    res.status(204).send(); // Відповідь з кодом 204 (No Content) після успішного видалення
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedFields = req.body; // Припустимо, що тіло запиту містить поля для оновлення користувача

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.update(updatedFields); // Оновлення користувача

    res.json(user); // Повертаємо оновлений об'єкт користувача у відповідь
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/categories/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const updatedFields = req.body; // Припустимо, що тіло запиту містить поля для оновлення категорії

    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    await category.update(updatedFields); // Оновлення категорії

    res.json(category); // Повертаємо оновлений об'єкт категорії у відповідь
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/ads/:id', async (req, res) => {
  try {
    const adId = req.params.id;
    const updatedFields = req.body; // Припустимо, що тіло запиту містить поля для оновлення оголошення

    const ad = await Ad.findByPk(adId);

    if (!ad) {
      return res.status(404).json({ error: 'Ad not found' });
    }

    await ad.update(updatedFields); // Оновлення оголошення

    res.json(ad); // Повертаємо оновлений об'єкт оголошення у відповідь
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/comments/:id', async (req, res) => {
  try {
    const commentId = req.params.id;
    const updatedFields = req.body; // Припустимо, що тіло запиту містить поля для оновлення коментаря

    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    await comment.update(updatedFields); // Оновлення коментаря

    res.json(comment); // Повертаємо оновлений об'єкт коментаря у відповідь
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/tags/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    const updatedFields = req.body; // Припустимо, що тіло запиту містить поля для оновлення тегу

    const tag = await Tag.findByPk(tagId);

    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }

    await tag.update(updatedFields); // Оновлення тегу

    res.json(tag); // Повертаємо оновлений об'єкт тегу у відповідь
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
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

  User.hasMany(Ad, { foreignKey: 'userId', onDelete: 'CASCADE' })
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
