import { Router } from 'express';
import { authDeactivateOwnAccount, authLogin } from '../controllers/auth';
import isLoggedIn from '../middlewares/isLoggedIn';
import { authLoginValidate } from '../middlewares/validations/auth';

// /api/v1/auth
const router = Router();

router.post('/login', authLoginValidate, authLogin);
router.patch('/me/deactivate', isLoggedIn, authDeactivateOwnAccount);

export default router;
