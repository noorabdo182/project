import express from 'express';
import cors from 'cors';

import bookRouter from './routes/book route';
import borrowRouter from './routes/borrow router';
import dashboardRouter from './routes/dashboard router';

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:4200'
  })
);

app.get(
  '/api/health',
  (_request, response) => {
    response.json({
      success: true,
      message: 'API is running'
    });
  }
);

app.use(
  '/api/books',
  bookRouter
);

app.use(
  '/api/borrows',
  borrowRouter
);

app.use(
  '/api/dashboard',
  dashboardRouter
);

export default app;