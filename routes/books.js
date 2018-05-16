const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');

router.get('/', booksController.index);
router.get('/:id', booksController.show);
router.post('/', booksController.create);
router.put('/:id', booksController.update);
router.delete('/:id', booksController.destroy);

module.exports = router;
