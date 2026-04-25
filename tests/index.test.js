const app = require('../src/index');

describe('GET /menu', () => {
  it('should return the full menu', async () => {
    const response = await fetch('http://localhost:3000/menu');
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data).toHaveLength(3);
    expect(data[0]).toHaveProperty('name', 'Margherita Pizza');
    expect(data[0]).toHaveProperty('price', 12.99);
  });
});

describe('GET /menu/:id', () => {
  it('should return a single menu item', async () => {
    const response = await fetch('http://localhost:3000/menu/1');
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.name).toBe('Margherita Pizza');
  });

  it('should return 404 for missing item', async () => {
    const response = await fetch('http://localhost:3000/menu/999');
    expect(response.status).toBe(404);
  });
});
