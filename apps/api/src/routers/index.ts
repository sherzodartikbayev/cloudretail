import express from 'express';
import { createToken } from './tokens/createToken';

export const tokensRouter = express.Router();

tokensRouter.post('/', createToken);
