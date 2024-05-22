const { Pool } = require('pg');

const pool = new Pool({
    user: 'upcode',
    password: 'upcode',
    host: 'localhost',
    port: 5433, 
    database: 'Products'
});

module.exports = pool;