import express from 'express';

export const app = express();

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '10mb' }));

app.get('/', (req, res) => {
  res.status(200).json({ status: 'OK' });
});
