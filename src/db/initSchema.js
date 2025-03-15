const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
});

async function initSchema() {
    await client.connect();

    const createContactsTableQuery = `
        CREATE TABLE IF NOT EXISTS contacts (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            business VARCHAR(255),
            email VARCHAR(255) NOT NULL,
            phone_type VARCHAR(50),
            phone VARCHAR(50),
            website VARCHAR(255)
        );
    `;

    try {
        await client.query(createContactsTableQuery);
        console.log('Contacts table created successfully');
    } catch (error) {
        console.error('Error creating contacts table:', error.message);
    } finally {
        await client.end();
    }
}

initSchema();