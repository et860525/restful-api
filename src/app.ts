import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const env = process.env.NODE_ENV;

// Logger
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json());

// Connect to database
import connect_db from './database/database';
connect_db();

// Routes
import todoRouter from './routes/todoRoutes';
app.use('/', todoRouter);

// Error message
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(
    `[server]: Server is running at http://localhost:${port} in ${env}`
  );
});
