import { sql } from '@ts-safeql/sql-tag';
import { DbClient, getRow } from '../../pool';

export const createUser = async (
  client: DbClient,
  values: { username: string; password: string },
) => {
  return getRow(
    client.query<{ id: number; username: string; password: string }>(
      sql`
        INSERT INTO users (username, password) 
        values (${values.username}, ${values.password}) 
        returning *
    `,
    ),
  );
};
