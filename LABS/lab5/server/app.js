const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Ad = require('./models/ad');
const Category = require('./models/category');
const Comment = require('./models/comment');
const Tag = require('./models/tag');
const User = require('./models/user');
const app = express()

async function insertData () {
  // Створення користувачів
  const user1 = new User({
    username: 'john_doe',
    email: 'john@example.com',
    password: 'password123'
  });

  const user2 = new User({
    username: 'jane_doe',
    email: 'jane@example.com',
    password: 'password123'
  });

  await user1.save();
  await user2.save();

  // Створення категорій
  const category1 = new Category({ name: 'Electronics' });
  const category2 = new Category({ name: 'Furniture' });

  await category1.save();
  await category2.save();

  // Створення тегів
  const tag1 = new Tag({ name: 'Sale' });
  const tag2 = new Tag({ name: 'New' });

  await tag1.save();
  await tag2.save();

  // Створення оголошень
  const ad1 = new Ad({
    title: 'iPhone 12',
    description: 'Brand new iPhone 12',
    price: 799,
    user: user1._id,
    category: category1._id,
    comments: [],
    tags: [tag1._id]
  });

  const ad2 = new Ad({
    title: 'Sofa',
    description: 'Comfortable sofa',
    price: 299,
    user: user2._id,
    category: category2._id,
    comments: [],
    tags: [tag2._id]
  });

  await ad1.save();
  await ad2.save();

  // Оновлення категорій з оголошеннями
  category1.ads.push(ad1._id);
  category2.ads.push(ad2._id);

  await category1.save();
  await category2.save();

  // Оновлення тегів з оголошеннями
  tag1.ads.push(ad1._id);
  tag2.ads.push(ad2._id);

  await tag1.save();
  await tag2.save();

  // Оновлення користувачів з оголошеннями
  user1.ads.push(ad1._id);
  user2.ads.push(ad2._id);

  await user1.save();
  await user2.save();

  // Створення коментарів
  const comment1 = new Comment({
    content: 'Great phone!',
    user: user2._id,
    ad: ad1._id
  });

  const comment2 = new Comment({
    content: 'Very comfortable!',
    user: user1._id,
    ad: ad2._id
  });

  await comment1.save();
  await comment2.save();

  // Оновлення оголошень з коментарями
  ad1.comments.push(comment1._id);
  ad2.comments.push(comment2._id);

  await ad1.save();
  await ad2.save();

  // Оновлення користувачів з коментарями
  user2.comments.push(comment1._id);
  user1.comments.push(comment2._id);

  await user2.save();
  await user1.save();
  console.log('Test data inserted successfully');
}

const adminRoutes = require('./routes/admin')

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(adminRoutes)

mongoose
  .connect(
    'mongodb+srv://test:test@cluster0.4thauwh.mongodb.net/seregga'
  )
  .then(async () => {
    // await insertData(); // Вставка даних

    // Запуск сервера Express
    app.listen(5000, () => {
      console.log('Server is running on http://localhost:5000');
    });
  })
  .catch(err => {
    console.log(err)
  })
