import { Router } from 'express';
import {
	bookCreateOne,
	bookDeleteOne,
	bookGetOne,
	booksGetAll,
	bookUpdateOne,
} from '../controllers/books';
import isLoggedIn from '../middlewares/isLoggedIn';
import { bookCreateOneValidation } from '../middlewares/validations/books';

// /api/v1/books
const router = Router();

router.use(isLoggedIn);

router.get('/', booksGetAll);
router.post('/', bookCreateOneValidation, bookCreateOne);
router.get('/:id', bookGetOne);
router.put('/:id', bookUpdateOne);
router.delete('/:id', bookDeleteOne);

export default router;
