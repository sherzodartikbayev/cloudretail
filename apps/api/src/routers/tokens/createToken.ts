import { userDao } from '../../daos/users';
import { pool } from '../../pool';
import zod from 'zod';
import crypto from 'node:crypto';
import { HttpError } from '../../http';
import { tokenDao } from '../../daos/tokens';
import { Request, Response } from 'express';

const bodySchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

export const createToken = async (request: Request, response: Response) => {
  const result = bodySchema.parse(request.body);
  const user = await userDao.selectByUsername(pool, {
    username: result.username,
  });
  if (user.password !== crypto.hash('sha256', result.password)) {
    throw new HttpError(401, 'Invalid username or password');
  }
  const token = await tokenDao.createToken(pool, { userId: user.id });
  return response.status(201).json(token);
};
