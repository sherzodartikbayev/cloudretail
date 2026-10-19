import crypto from 'node:crypto';
import { DbClient } from './pool';
import * as usersDao from './daos/users/index';
import { ADMIN_PASSWORD, ADMIN_USERNAME } from './constant';
import { NoRecordsFound } from './exceptions';

export const seed = async (client: DbClient) => {
  try {
    await usersDao.selectByUsername(client, { username: 'admin' });
  } catch (error) {
    if (error instanceof NoRecordsFound) {
      await usersDao.createUser(client, {
        username: ADMIN_USERNAME,
        password: crypto.hash('sha256', ADMIN_PASSWORD),
      });
      console.info('Admin user created');
    }
  }
  console.info('Seed complete');
};
