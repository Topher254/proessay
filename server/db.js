const mysql = require('mysql2/promise');
require('dotenv').config();

// Validate environment variables
const requiredEnvVars = ['DB_USER', 'DB_PASSWORD', 'DB_NAME'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingVars.join(', '));
  process.exit(1);
}

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: '+00:00',
  connectTimeout: 10000,
  multipleStatements: false
});

// Test connection with better error reporting
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL database');
    
    // Verify database access
    const [rows] = await connection.query('SELECT DATABASE() AS db');
    console.log(`🔑 Using database: ${rows[0].db}`);
    
    connection.release();
  } catch (err) {
    console.error('❌ Database connection failed:');
    console.error(`  Error code: ${err.code}`);
    console.error(`  Error message: ${err.message}`);
    
    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('  Possible solutions:');
      console.error('  1. Verify DB_USER and DB_PASSWORD in .env file');
      console.error('  2. Check MySQL user privileges');
      console.error(`  3. Test login manually: mysql -u ${process.env.DB_USER} -p`);
    }
    
    process.exit(1);
  }
};

testConnection();

module.exports = pool;