import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import config from 'config';
import img from './api/img';


const app = express();

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
  exposedHeaders: config.get('corsHeaders'),
}));

app.use(bodyParser.json({
  limit : config.get('bodyLimit')
}));

// connect to db
initializeDb( db => {
  // internal middleware
  app.use(middleware({ config, db }));

  // api router
  app.use('/api', api({ config, db }));
  app.use('/img', img({ config, db }));

  const port = process.env.PORT || config.get('server.port')
  const host = process.env.HOST || config.get('server.host')
  app.listen(parseInt(port), host, () => {
    console.log(`Vue Storefront Sample API started at http://${host}:${port}`);
  });
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

export default app;
