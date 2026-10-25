import { createHandler, createRoute, Fetcher, HttpResponse } from '../../http';
import { tokenDao } from '../../daos/tokens';
import { pool } from '../../pool';
import { getTokenEndpoint } from '../../endpoints';

export const getToken = createRoute({
  endpoint: getTokenEndpoint,
  handler: createHandler({
    process: async ({ params }) => {
      const token = await tokenDao.selectById(pool, {
        id: (params as { id: number }).id,
      });
      return new HttpResponse(200, token);
    },
  }),
});

export type GetTokenFetcher = Fetcher<typeof getToken.handler>;
