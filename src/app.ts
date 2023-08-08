import cors from 'cors';
import { configDotenv } from 'dotenv';
import express from 'express';
import { scheduleJob } from 'node-schedule';

import authenticate from './middleware/auth';
import list from './routes/list';
import b2Auth from './util/b2auth';
import morgan from 'morgan';

if (process.env.ENV != 'prod') {
  const env = configDotenv();
  console.log(env);
}

// 0 0 * * * -> everyday at midnight
const job = scheduleJob('0 0 * * *', b2Auth.updateToken);
job.invoke();
console.log(`current token is ${b2Auth.token}`);

const application = express();
application.use(morgan('combined'));
application.use(cors());
application.options('/list');
application.use([authenticate]);
application.get('/list', list);

application.listen(3010, () => {
  console.log(`listening on port 3010`);
});
