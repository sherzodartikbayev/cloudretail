import { sql } from '@ts-safeql/sql-tag';
import { DbClient, getRow } from '../../pool';

export const createToken = (client: DbClient, values: { userId: number }) => {
  return getRow(
    client.query<{ id: number; token: string; user_id: number }>(
      sql`insert into tokens (user_id) values (${values.userId}) returning *`,
    ),
  );
};
