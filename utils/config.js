const allowedCors = [
  'http://movies-tourer.nomoredomains.monster',
  'https://movies-tourer.nomoredomains.monster',
  'http://localhost:3000'
];

const DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb';

module.exports = { allowedCors, DB_URL };
