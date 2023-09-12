import express from 'express';
import reviewRouter from './router';
import { errorHandler } from './middlewares/errorHandler';
import winston from 'winston';
import cors from 'cors';

const main = async () => {
  const app = express();

  app.use(cors());

  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: new winston.transports.Console(),
  });

  app.use((req, _, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
  });

  app.use(express.json());

  app.get('/', (_, res) => {
    res.send('Welcome to your API!');
  });

  app.use('/api', reviewRouter);

  app.use(errorHandler);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

main().catch(err => console.error(err));
