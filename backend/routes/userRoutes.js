import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { getUserData, storeRecentSearchedCities } from '../controller/userController.js';
import { requireAuth } from '@clerk/express';

const userRouter = express.Router();

userRouter.get('/', requireAuth() , protect, getUserData);
userRouter.post('/store-recent-search', protect, storeRecentSearchedCities);
export default userRouter;