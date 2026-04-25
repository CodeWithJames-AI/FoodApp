const { app } = require('../src/index');

let server;
let baseUrl;

beforeAll((done) => {
  server = app.listen(0, () => {
    const port = server.address().port;
    baseUrl = `http://localhost:${port}`;
    done();
  });
});

afterAll((done) => {
  server.close(done);
});

describe('GET /menu', () => {
  it('should return the full menu', async () => {
    const response = await fetch(`${baseUrl}/menu`);
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data).toHaveLength(3);
    expect(data[0]).toHaveProperty('name', 'Margherita Pizza');
    expect(data[0]).toHaveProperty('price', 12.99);
  });
});

describe('GET /menu/:id', () => {
  it('should return a single menu item', async () => {
    const response = await fetch(`${baseUrl}/menu/1`);
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.name).toBe('Margherita Pizza');
  });

  it('should return 404 for missing item', async () => {
    const response = await fetch(`${baseUrl}/menu/999`);
    expect(response.status).toBe(404);
  });
});

describe('POST /orders', () => {
  it('should create an order and return 201 with order ID', async () => {
    const response = await fetch(`${baseUrl}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ menuId: 1, quantity: 2 }] }),
    });
    const data = await response.json();
    expect(response.status).toBe(201);
    expect(data).toHaveProperty('orderId');
    expect(data.orderId).toBeTruthy();
  });

  it('should reject invalid order payload with 400', async () => {
    const response = await fetch(`${baseUrl}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    expect(response.status).toBe(400);
  });
});
