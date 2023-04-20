const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const router = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

app.use(express.json());
app.use(cookieParser());

app.use('/', router);

app.listen(PORT, () => console.log(`Server started on ${PORT} port's`));
