const Pool = require('pg').Pool

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  // ssl : { rejectUnauthorized: false }
});

pool.on('connect', () => {
  console.log('Database Connected!');
});

module.exports = pool



