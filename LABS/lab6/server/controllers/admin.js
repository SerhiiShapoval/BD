const Ad = require('../models/ad')
const User = require('../models/user')
exports.getAdsWithDetails = async (req, res) => {
  try {
    const results = await Ad.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryInfo"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userInfo"
        }
      },
      {
        $unwind: "$categoryInfo"
      },
      {
        $unwind: "$userInfo"
      }
    ]);

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.getAdsWithComments = async (req, res) => {
  try {
    const results = await Ad.aggregate([
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "ad",
          as: "adComments"
        }
      },
      {
        $project: {
          title: 1,
          description: 1,
          price: 1,
          commentsCount: { $size: "$adComments" }
        }
      }
    ]);

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.getUsersWithStats = async (req, res) => {
  try {
    const results = await User.aggregate([
      {
        $lookup: {
          from: "ads",
          localField: "_id",
          foreignField: "user",
          as: "userAds"
        }
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "user",
          as: "userComments"
        }
      },
      {
        $project: {
          username: 1,
          email: 1,
          adsCount: { $size: "$userAds" },
          commentsCount: { $size: "$userComments" }
        }
      }
    ]);

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body); // Створюємо нового користувача на основі даних з запиту
    await newUser.save(); // Зберігаємо користувача в базу даних
    res.status(201).json(newUser); // Повертаємо створеного користувача у відповідь
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find(); // Запит до бази даних для отримання всіх користувачів
    res.json(users); // Повертаємо знайдених користувачів у відповідь
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true }); // Оновлюємо користувача за його ID
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser); // Повертаємо оновленого користувача у відповідь
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id); // Видаляємо користувача за його ID
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(deletedUser); // Повертаємо видаленого користувача у відповідь
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
