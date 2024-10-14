const mysql = require('mysql2/promise'); // Import the mysql2 library for working with MySQL

// Create a connection pool for the database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'zliu47_root',
  password: '42574e7d23ec',
  database: 'crowdfunding_db'
});

// Export the connection pool for use in other modules
module.exports = pool;