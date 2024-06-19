const path = require('path')

const express = require('express')

const adminController = require('../controllers/admin')

const router = express.Router()

router.get('/ads-with-details', adminController.getAdsWithDetails)
router.get('/ads-with-comments-count', adminController.getAdsWithComments)
router.get('/users-with-stats', adminController.getUsersWithStats)
module.exports = router
