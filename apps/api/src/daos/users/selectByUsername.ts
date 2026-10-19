import { sql } from '@ts-safeql/sql-tag';
import { getRow, DbClient } from '../../pool';

export const selectByUsername = async (
  client: DbClient,
  { username }: { username: string },
) => {
  return getRow(
    client.query<{ id: number; username: string; password: string }>(
      sql`SELECT  * FROM users WHERE username = ${username}`,
    ),
  );
};
