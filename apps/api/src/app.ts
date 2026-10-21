import express, { Request, Response, NextFunction } from 'express';
import { HttpError } from './http';
import { ZodError } from 'zod';
import { createToken } from './routers/tokens/createToken';

export const app = express();

// Middlewares
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '10mb' }));

// Routers
app.get('/', (_req, res) => {
  return res.status(200).json({ status: 'OK' });
});

app[createToken.method](createToken.path, createToken.handler);

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);

  if (error instanceof HttpError) {
    return res.status(error.status).json({ error: error.message });
  }

  if (error instanceof ZodError) {
    return res.status(422).json({ error: error.message });
  }

  return res.status(500).json({ error: 'Something went wrong' });
});
