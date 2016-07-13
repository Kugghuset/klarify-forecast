'use strict'

import express from 'express';
import bodyParser from 'body-parser';
import sql from 'seriate';

import config from './config';
import utils from './utils/utils';

const app = express();

// Set default configuration for Seriate
sql.setDefaultConfig(config.db);


// Use the body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


import routes from './routes';

routes(app, utils.logger);

const server = app.listen(config.port, config.ip, () => {
  const { address, port } = server.address();

  utils.log(`App listening on ${address} on port ${port}`);
})
