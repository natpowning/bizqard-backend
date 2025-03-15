const { Pool } = require('pg');
require('dotenv').config();
const initSchema = require('./initSchema');

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
});

const checkDatabaseExists = async () => {
    const client = new Pool({
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        password: process.env.POSTGRES_PASSWORD,
        port: process.env.POSTGRES_PORT,
    });

    try {
        const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${process.env.POSTGRES_DB}'`);
        return res.rowCount > 0;
    } finally {
        await client.end();
    }
};

const connectDB = async () => {
    try {
        console.log(`Connecting to PostgreSQL database:
        User: ${process.env.POSTGRES_USER}
        Host: ${process.env.POSTGRES_HOST}
        Database: ${process.env.POSTGRES_DB}
        Port: ${process.env.POSTGRES_PORT}`);

        const dbExists = await checkDatabaseExists();
        if (!dbExists) {
            console.log('Database does not exist. Initializing schema...');
            await initSchema();
        }

        await pool.connect();
        console.log('Connected to PostgreSQL database');
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
};

module.exports = {
    connectDB,
    query: (text, params) => pool.query(text, params),
};