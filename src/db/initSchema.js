const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
});

const initSchema = async () => {
    const client = await pool.connect();
    try {
        const createDatabaseQuery = `
            CREATE DATABASE ${process.env.POSTGRES_DB} WITH OWNER = ${process.env.POSTGRES_USER};
        `;
        await client.query(createDatabaseQuery);
        console.log(`Database ${process.env.POSTGRES_DB} created or already exists`);

        // Reconnect to the newly created database
        const dbPool = new Pool({
            user: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOST,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            port: process.env.POSTGRES_PORT,
        });

        const dbClient = await dbPool.connect();
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
            await dbClient.query(createTableQuery);
            console.log('Schema initialized');
        } catch (err) {
            console.error('Error initializing schema:', err);
        } finally {
            dbClient.release();
        }
    } catch (err) {
        console.error('Error creating database:', err);
    } finally {
        client.release();
    }
};

module.exports = initSchema;