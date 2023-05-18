import express, { Express } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const env = process.env.NODE_ENV;

app.use(morgan('tiny'));

// Connect to database
import connect_db from './database/database';
connect_db();

// Routes
import todoRouter from './routes/todoRoutes';
app.use('/', todoRouter);

app.listen(port, () => {
  console.log(
    `[server]: Server is running at http://localhost:${port} in ${env}`
  );
});
