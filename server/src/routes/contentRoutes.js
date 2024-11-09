const express = require('express');
const contentRouter = express.Router();
const contentController = require('../controllers/contentController');
const admimnMiddleware = require('../middlewares/adminMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

contentRouter.get('/', contentController.listContent);
contentRouter.get('/:id', contentController.contentById);

contentRouter.post('/create', [authMiddleware, admimnMiddleware], contentController.createContent);

contentRouter.put('/:id', [authMiddleware, admimnMiddleware], contentController.contentUpdate);

contentRouter.delete('/:id', [authMiddleware, admimnMiddleware], contentController.contentDelete);

module.exports = contentRouter;
