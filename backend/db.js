
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:password@db:5432/brokerdb'
});

module.exports = pool;
