import { Router } from 'express';
import {
	userCreateOne,
	userDeleteOne,
	userGetAll,
	userGetOne,
	userUpdateOne,
} from '../controllers/users';
import isAdmin from '../middlewares/isAdmin';
import isLoggedIn from '../middlewares/isLoggedIn';
import { userCreateOneValidation } from '../middlewares/validations/users';

// /api/v1/users
const router = Router();

router.use(isLoggedIn, isAdmin);

router.get('/', userGetAll);
router.post('/', userCreateOneValidation, userCreateOne);
router.get('/:id', userGetOne);
router.put('/:id', userUpdateOne);
router.delete('/:id', userDeleteOne);

export default router;
