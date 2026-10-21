import express, { Request, Response, NextFunction } from 'express';
import { HttpError } from './http';
import { tokensRouter } from './routers';

export const app = express();

// Middlewares
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '10mb' }));

// Routers
app.get('/', (_req, res) => {
  return res.status(200).json({ status: 'OK' });
});
app.use('/tokens', tokensRouter);

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof HttpError) {
    res.status(error.status).json({ error: error.message });
  }

  return res.status(500).json({ error: 'Something went wrong' });
});
