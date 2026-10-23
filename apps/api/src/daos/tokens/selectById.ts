import { sql } from '@ts-safeql/sql-tag';
import { DbClient, getRow } from '../../pool';

export const selectById = (client: DbClient, values: { id: number }) => {
  return getRow(
    client.query<{ id: number; token: string; user_id: number }>(
      sql`select * from tokens where id = ${values.id}`,
    ),
  );
};
