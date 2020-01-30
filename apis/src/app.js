const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const rfs = require('rotating-file-stream');
const { sequelize } = require('./database/models');
const errors = require('./middlewares/errors');
const routes = require('./routes');

const { NODE_ENV, LOG_INTERVAL = '1d' } = process.env;

sequelize.sync();

const app = express();

app.set('trust proxy', true);

if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else if (NODE_ENV === 'production') {
  const logDir = path.join(__dirname, '../logs');

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  const logStream = rfs.createStream('access.log', {
    interval: LOG_INTERVAL,
    path: logDir,
  });

  app.use(morgan('combined', { stream: logStream }));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(routes);
app.use(errors);

module.exports = app;
