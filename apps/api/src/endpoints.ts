import { Endpoint } from './http';

export const createTokenEndpoint = new Endpoint('post', '/tokens');

export const getTokenEndpoint = new Endpoint<{ id: string }>(
  'get',
  '/tokens/:id',
);
