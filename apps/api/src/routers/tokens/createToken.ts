import crypto from 'node:crypto';
import { RequestHandler } from 'express';
import zod from 'zod';
import { userDao } from '../../daos/users';
import { tokenDao } from '../../daos/tokens';
import { pool } from '../../pool';
import { HttpError } from '../../http';

const bodySchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

const handler: RequestHandler = async (request, response) => {
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

export const createToken = {
  method: 'post' as const,
  path: '/tokens',
  handler,
};
