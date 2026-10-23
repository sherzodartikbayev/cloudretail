import zod from 'zod';
import { createHandler, createRoute, Endpoint, HttpResponse } from '../../http';
import { tokenDao } from '../../daos/tokens';
import { pool } from '../../pool';

export const getToken = createRoute({
  endpoint: new Endpoint<{ id: number }>('get', '/tokens/:id'),
  handler: createHandler({
    bodySchema: zod.object({}),
    process: async ({ params }) => {
      const token = await tokenDao.selectById(pool, {
        id: (params as { id: number }).id,
      });
      return new HttpResponse(200, token);
    },
  }),
});
