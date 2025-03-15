const express = require('express');
const ContactsController = require('../controllers/contactsController');

const router = express.Router();
const contactsController = new ContactsController();

router.post('/', contactsController.createContact.bind(contactsController));
router.get('/', contactsController.getContacts.bind(contactsController));
router.get('/:id', contactsController.getContactById.bind(contactsController));
router.put('/:id', contactsController.updateContact.bind(contactsController));
router.delete('/:id', contactsController.deleteContact.bind(contactsController));

module.exports = router;