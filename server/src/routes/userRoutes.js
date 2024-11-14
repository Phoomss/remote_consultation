const userController = require('../controllers/userController');
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const userRouter = express.Router();

userRouter.get('/userInfo', authMiddleware, userController.userInfo);
userRouter.get('/', authMiddleware, userController.userList);
userRouter.get('/search', authMiddleware, userController.searchUser);

userRouter.put('/editProfile', authMiddleware, userController.editProfile);

module.exports = userRouter;
