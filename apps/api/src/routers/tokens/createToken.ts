import crypto from 'node:crypto';
import zod from 'zod';
import { userDao } from '../../daos/users';
import { tokenDao } from '../../daos/tokens';
import { pool } from '../../pool';
import {
  createHandler,
  createRoute,
  Fetcher,
  HttpError,
  HttpResponse,
} from '../../http';
import { createTokenEndpoint } from '../../endpoints';

export const createToken = createRoute({
  endpoint: createTokenEndpoint,
  handler: createHandler({
    bodySchema: zod.object({
      username: zod.string(),
      password: zod.string(),
    }),
    process: async ({ body }) => {
      const user = await userDao.selectByUsername(pool, {
        username: body.username,
      });
      if (user.password !== crypto.hash('sha256', body.password)) {
        throw new HttpError(401, 'Invalid username or password');
      }
      const token = await tokenDao.createToken(pool, { userId: user.id });
      return new HttpResponse(201, { token: token.token });
    },
  }),
});

export type CreateTokenFetcher = Fetcher<typeof createToken.handler>;
