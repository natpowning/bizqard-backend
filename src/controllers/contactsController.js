class ContactsController {
    constructor(db) {
        this.db = db;
    }

    async createContact(req, res) {
        const { firstName, lastName, business, email, phoneType, phone, website } = req.body;
        try {
            const result = await this.db.query(
                'INSERT INTO contacts (first_name, last_name, business, email, phone_type, phone, website) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                [firstName, lastName, business, email, phoneType, phone, website]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create contact' });
        }
    }

    async getContacts(req, res) {
        try {
            const result = await this.db.query('SELECT * FROM contacts');
            res.status(200).json(result.rows);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve contacts' });
        }
    }

    async getContactById(req, res) {
        const { id } = req.params;
        try {
            const result = await this.db.query('SELECT * FROM contacts WHERE id = $1', [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Contact not found' });
            }
            res.status(200).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve contact' });
        }
    }

    async updateContact(req, res) {
        const { id } = req.params;
        const { firstName, lastName, business, email, phoneType, phone, website } = req.body;
        try {
            const result = await this.db.query(
                'UPDATE contacts SET first_name = $1, last_name = $2, business = $3, email = $4, phone_type = $5, phone = $6, website = $7 WHERE id = $8 RETURNING *',
                [firstName, lastName, business, email, phoneType, phone, website, id]
            );
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Contact not found' });
            }
            res.status(200).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update contact' });
        }
    }

    async deleteContact(req, res) {
        const { id } = req.params;
        try {
            const result = await this.db.query('DELETE FROM contacts WHERE id = $1 RETURNING *', [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Contact not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete contact' });
        }
    }
}

module.exports = ContactsController;