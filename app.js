const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
require('dotenv').config();

const router = require('./routes/index');
const errorHandler = require('./middlewares/error-handler');
const cors = require('./middlewares/cors-handler');
const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { DB_URL } = require('./utils/config');

const { PORT = 3000, DB_PROD = DB_URL } = process.env;

const app = express();
mongoose.connect(DB_PROD);

app.use(cors);
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);

app.use('/', router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on ${PORT} port's`));
