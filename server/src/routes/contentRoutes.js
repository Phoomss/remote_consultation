const express = require('express');
const contentRouter = express.Router();
const contentController = require('../controllers/contentController');

contentRouter.get('/create', contentController.listContent);
contentRouter.get('/:id', contentController.contentById);

contentRouter.post('/', contentController.createContent);

contentRouter.put('/:id', contentController.contentUpdate);

contentRouter.delete('/:id', contentController.contentDelete);

module.exports = contentRouter;
