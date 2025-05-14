import { Router } from 'express';
import { createUser, login} from './user.controller';

export const userRouter = Router();

userRouter.post('/', createUser);

userRouter.post('/login', login);