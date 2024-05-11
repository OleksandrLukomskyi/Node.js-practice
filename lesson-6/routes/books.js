import express from 'express';
import BookController from '../controllers/book.js';
const router = express.Router();
const jsonParser = express.json();

router.get('/', BookController.getBooks);
router.get('/:id', BookController.getBook);
router.post('/', BookController.createBook);
router.put('/:id', BookController.updateBook);
router.delete('/:id', BookController.deleteBook);

export default router;
