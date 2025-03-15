const express = require('express');
const ContactsController = require('../controllers/contactsController');
const db = require('../db/index');

const router = express.Router();
const contactsController = new ContactsController(db);

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Create a new contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               business:
 *                 type: string
 *               email:
 *                 type: string
 *               phone_type:
 *                 type: string
 *               phone:
 *                 type: string
 *               website:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact created successfully
 */
router.post('/contacts', (req, res) => contactsController.createContact(req, res));

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Retrieve a list of contacts
 *     responses:
 *       200:
 *         description: A list of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: string
 */
router.get('/contacts', (req, res) => contactsController.getContacts(req, res));

/**
 * @swagger
 * /api/contacts/{id}:
 *   get:
 *     summary: Retrieve a single contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single contact
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 */
router.get('/contacts/:id', (req, res) => contactsController.getContactById(req, res));

/**
 * @swagger
 * /api/contacts/{id}:
 *   put:
 *     summary: Update a contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact updated successfully
 */
router.put('/contacts/:id', (req, res) => contactsController.updateContact(req, res));

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Delete a contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Contact deleted successfully
 */
router.delete('/contacts/:id', (req, res) => contactsController.deleteContact(req, res));

const setRoutes = (app) => {
    app.use('/api', router);
};

module.exports = setRoutes;