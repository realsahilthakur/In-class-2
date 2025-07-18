const axios = require('axios');

describe('Integration Test', () => {
  it('should return 200 from service container', async () => {
    const response = await axios.get('http://localhost:3000');
    expect(response.status).toBe(200);
  });
});
