const express = require('express');
const ContactsController = require('../controllers/contactsController');
const db = require('../db/index');

const router = express.Router();
const contactsController = new ContactsController(db);

router.post('/contacts', (req, res) => contactsController.createContact(req, res));
router.get('/contacts', (req, res) => contactsController.getContacts(req, res));
router.get('/contacts/:id', (req, res) => contactsController.getContactById(req, res));
router.put('/contacts/:id', (req, res) => contactsController.updateContact(req, res));
router.delete('/contacts/:id', (req, res) => contactsController.deleteContact(req, res));

const setRoutes = (app) => {
    app.use('/api', router);
};

module.exports = setRoutes;