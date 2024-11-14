const userController = require('../controllers/userController');
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const userRouter = express.Router();

userRouter.get('/count', authMiddleware, userController.countUser);
userRouter.get('/userInfo', authMiddleware, userController.userInfo);
userRouter.get('/', authMiddleware, userController.userList);
userRouter.get('/search', authMiddleware, userController.searchUser);
userRouter.get('/:id', authMiddleware, userController.userById);

userRouter.put('/editProfile', authMiddleware, userController.editProfile);
userRouter.put('/:id', authMiddleware, userController.updateUser);


module.exports = userRouter;
