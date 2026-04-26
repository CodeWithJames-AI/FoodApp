// FoodApp - Simple food ordering app

const express = require('express');
const app = express();

app.use(express.json());

const menu = [
  { id: 1, name: 'Margherita Pizza', price: 12.99 },
  { id: 2, name: 'Caesar Salad', price: 8.99 },
  { id: 3, name: 'Cheeseburger', price: 10.99 },
];
const orders = [];
let nextOrderId = 1;

app.get('/menu', (req, res) => {
  res.json(menu);
});

app.get('/menu/:id', (req, res) => {
  const item = menu.find(m => m.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
});

app.post('/orders', (req, res) => {
  const { items } = req.body ?? {};

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Order must include at least one item' });
  }

  const hasInvalidItems = items.some(item => {
    if (!item || typeof item !== 'object') {
      return true;
    }

    const menuItem = menu.find(entry => entry.id === item.menuId);

    return !Number.isInteger(item.quantity) || item.quantity < 1 || !menuItem;
  });

  if (hasInvalidItems) {
    return res.status(400).json({ error: 'Order contains invalid items' });
  }

  const order = {
    orderId: nextOrderId,
    items,
  };

  orders.push(order);
  nextOrderId += 1;

  return res.status(201).json({ orderId: order.orderId });
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`FoodApp running on port ${PORT}`));
}

module.exports = { app, PORT };
