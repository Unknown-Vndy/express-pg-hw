const express = require('express');
const { errorHandler } = require('./middleware/errorHandlers');
const router = require('./router');

const app = express();

app.use(express.json());

app.use('/api', router);

app.use(errorHandler);

module.exports = app;
