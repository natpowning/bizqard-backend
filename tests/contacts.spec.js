const { test, expect } = require('@playwright/test');

test.describe('Contacts API', () => {
  test('should create a new contact', async ({ request }) => {
    const newContact = {
      firstName: 'John',
      lastName: 'Doe',
      business: 'Example Inc.',
      email: 'john.doe@example.com',
      phoneType: 'mobile',
      phone: '123-456-7890',
      website: 'https://example.com'
    };

    const response = await request.post('/contacts', {
      data: newContact
    });

    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody).toMatchObject(newContact);
  });
});