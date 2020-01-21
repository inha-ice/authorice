const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const errors = require('./middlewares/errors');
const { sequelize } = require('./models');
const routes = require('./routes');

sequelize.sync();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(helmet());
app.use(morgan('combined'));
app.use(routes);
app.use(errors);

module.exports = app;
