const { Pool } = require('pg');

const dbConfig = {
  user: 'postgres',
  password: 'admin',
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

pool.query('SELECT CURRENT_DATE;', (err, data) => {
  if (!err) {
    console.log('cb data', data.rows);
  }
});

pool
  .query('SELECT CURRENT_DATE;')
  .then(data => console.log('promise data', data.rows))
  .catch(err => console.log('err', err));

(async () => {
  try {
    const data = await pool.query('SELECT CURRENT_DATE;');
    console.log('data.rows', data.rows);
  } catch (err) {
    console.log('err', err);
  }
})();

pool
  .query('SELECT * FROM users;')
  .then(({ rows }) => console.log('result', rows))
  .catch(err => console.log('err', err));

const id = 10;

pool
  .query(
    `
    SELECT * 
    FROM users 
    WHERE id=${id};
  `
  )
  .then(({ rows }) => console.log('result', rows))
  .catch(err => console.log('err', err));

pool
  .query('SELECT * FROM users WHERE id=$1;', [id])
  .then(({ rows }) => console.log('result with $1', rows))
  .catch(err => console.log('err', err));
