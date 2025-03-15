module.exports = {
  testDir: 'tests',
  use: {
    headless: true,
    baseURL: 'http://localhost:3000' // Ensure this is the correct base URL
  },
  reporter: 'html'
};