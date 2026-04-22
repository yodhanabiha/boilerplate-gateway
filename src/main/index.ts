import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import config, { initializeConnection } from './config/GeneralConfig';
import router from './routes';
import { handleError } from './middleware/ErrorHandler';
import Logging from './config/LoggingConfig';
import { handleLogging } from './middleware/Logging';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import GeneralConfig from './config/GeneralConfig';
import { createWorker } from './config/mediasoup/worker';
import Room from './config/mediasoup/room';
import { mediasoupConfig } from './config/mediasoup/config';
import EmailConfig from './config/EmailConfig';
// import { routerMedia,createWebRtcTransport, initMediasoup } from './utility/MediaSoupUtility';
// import { initSocket } from './utility/SocketUtility';
const { CronJob } = require('cron');
const mediasoup = require("mediasoup");

// Initialize Connection

// Register All Consumers
// listenConsumers();


// const jobAttandance = new CronJob('*/30 * * * *', () => {
//   const attandance = new AttendanceHandler();
//   attandance.handleRecomputeAttandance();
//   console.log('Job Recompute Attandance running...');
// });
// jobAttandance.start();



// const jobAttandanceOut = new CronJob('*/15 * * * *', () => {
//   const attandance = new AttendanceHandler();
//   attandance.handleRecomputeAttandanceOut();
//   console.log('Job Recompute Attandance Out running...');
// });
// jobAttandanceOut.start();

// const jobEmail = new CronJob('*/10 * * * * *', () => {
//   const email = new EmailConfig();
//   email.refreshEmailAction();
// });

// Start the job
// jobEmail.start();


let worker: any;
let routerMedia: any;
const rooms = new Map();

(async () => {

  initializeConnection();

  const app = express();
  app.set('trust proxy', true);
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json({ limit: '5mb' }));
  app.use((req, res, next) => {
    app.locals.baseUrl = `${req.protocol}://${req.get('host')}`;
    next();
  });

  if (config.IS_TRACING) {
    app.use(handleLogging);
  }

  // Route Assignment
  app.get('/', (req: Request, res: Response) => {
    return res.send('Connected to server');
  });
  router.forEach(value => {
    app.use('/api/v1', value);
  });
  app.use(handleError); // custom error handler
  app.get('/health', (_req, res) => res.status(200).send('OK'));
  app.listen(config.SERVER_PORT, () => {
    Logging.info('Listen to port ' + config.SERVER_PORT);
  });

})();


