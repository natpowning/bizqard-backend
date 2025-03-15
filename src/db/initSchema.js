const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const initSchema = async () => {
    const client = await pool.connect();
    try {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS contacts (
                id SERIAL PRIMARY KEY,
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50) NOT NULL,
                business VARCHAR(100),
                email VARCHAR(100) UNIQUE NOT NULL,
                phone_type VARCHAR(20),
                phone VARCHAR(20),
                website VARCHAR(100)
            );
        `;
        await client.query(createTableQuery);
        console.log('Schema initialized');
    } catch (err) {
        console.error('Error initializing schema:', err);
    } finally {
        client.release();
    }
};

module.exports = initSchema;