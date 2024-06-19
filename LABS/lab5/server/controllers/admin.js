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