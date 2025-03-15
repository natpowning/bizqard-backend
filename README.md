# Contact Management API

This is a Node.js application that provides a RESTful API for managing contacts. The API allows users to perform CRUD (Create, Read, Update, Delete) operations on contact information.

## Features

- Manage contacts with the following fields:
  - First Name
  - Last Name
  - Business
  - Email
  - Phone Type
  - Phone
  - Website

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- dotenv for environment variable management

## Project Structure

```
my-node-app
├── src
│   ├── app.js                # Entry point of the application
│   ├── controllers           # Contains controllers for handling requests
│   │   └── contactsController.js
│   ├── models                # Contains models for database entities
│   │   └── contact.js
│   ├── routes                # Contains route definitions
│   │   └── contacts.js
│   └── db                   # Database connection logic
│       └── index.js
├── package.json              # NPM configuration file
├── .env                      # Environment variables
├── .gitignore                # Files and directories to ignore by Git
└── README.md                 # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd my-node-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your PostgreSQL connection details:
   ```
   DATABASE_URL=your_database_url
   ```

4. Start the application:
   ```
   npm start
   ```

## API Usage

### Endpoints

- `POST /contacts` - Create a new contact
- `GET /contacts` - Retrieve all contacts
- `GET /contacts/:id` - Retrieve a contact by ID
- `PUT /contacts/:id` - Update a contact by ID
- `DELETE /contacts/:id` - Delete a contact by ID

## License

This project is licensed under the MIT License.