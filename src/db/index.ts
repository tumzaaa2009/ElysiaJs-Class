const mysql = require('mysql2');
import { DB_TYPE, DB_USER, DB_PASS, DB_HOST, DB_NAME, DB_PORT } from '@config'
const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASS,
  port: DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
});


export default pool;
