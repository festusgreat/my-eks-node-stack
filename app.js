const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  // 👈 These match the ConfigMap and Secret environment variables injected by Helm!
  host: process.env.DB_HOST || 'postgres-service', 
  user: process.env.DB_USER || 'myuser',
  password: process.env.DB_PASSWORD || 'mypass',
  database: process.env.DB_NAME || 'mydb',
  port: process.env.DB_PORT || 5432,
});

app.get('/', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    res.send(`DB Time: ${result.rows[0].now}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection error");
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
