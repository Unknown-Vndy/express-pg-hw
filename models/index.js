const { Pool } = require('pg');
const User = require('./user');
const Phone = require('./phone');

const dbConfig = {
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'phones_sales',
};

const pool = new Pool(dbConfig);

pool.connect(err => {
  if (!err) {
    console.log('Connection to DB successfully done)))');
  }
});

process.on('beforeExit', () => {
  pool.end();
});

User.pool = pool;
Phone.pool = pool;

module.exports = { User, Phone };
