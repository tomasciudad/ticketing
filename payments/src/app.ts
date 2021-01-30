import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@tcticketing/common';
import { CreateChargeRouter} from './routes/new';


const app = express() ;
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false, //process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUser);

app.use(CreateChargeRouter);

app.all('*',async(req, res)=>{
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };