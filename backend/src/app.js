const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const DIST = path.join(__dirname, '../../frontend/dist');
const app = express();
app.set('trust proxy', 1);
app.use(express.json(), cookieParser());
app.use('/api', routes);
app.use(express.static(DIST));
app.get('*', (_, res) => res.sendFile(path.join(DIST, 'index.html')));
app.use(errorHandler);
module.exports = app;
