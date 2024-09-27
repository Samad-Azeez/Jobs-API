import express from 'express';
import { register, login } from '../controllers/auth.js';

export const authRouter = express.Router();

router.post('/register', register);
router.post('/login', login);
