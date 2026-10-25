import { Endpoint } from './http';

export const createTokenEndpoint = new Endpoint('post', '/tokens');

export const getTokenEndpoint = new Endpoint<{ id: number }>(
  'get',
  '/tokens/:id',
);
