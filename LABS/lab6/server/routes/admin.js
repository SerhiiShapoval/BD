const path = require('path')

const express = require('express')

const adminController = require('../controllers/admin')

const router = express.Router()

router.get('/ads-with-details', adminController.getAdsWithDetails)
router.get('/ads-with-comments-count', adminController.getAdsWithComments)
router.get('/users-with-stats', adminController.getUsersWithStats)
router.post('/create-user', adminController.createUser)
router.get('/users', adminController.getUsers)
router.put('/update-user/:id', adminController.updateUser)
router.delete('/delete-user/:id', adminController.deleteUser)
module.exports = router
