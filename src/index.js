// FoodApp - Simple food ordering app

const express = require('express');
const app = express();

app.use(express.json());

const menu = [
  { id: 1, name: 'Margherita Pizza', price: 12.99 },
  { id: 2, name: 'Caesar Salad', price: 8.99 },
  { id: 3, name: 'Cheeseburger', price: 10.99 },
];

app.get('/menu', (req, res) => {
  res.json(menu);
});

app.get('/menu/:id', (req, res) => {
  const item = menu.find(m => m.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
});

// TODO: Add POST /orders endpoint

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`FoodApp running on port ${PORT}`));
}

module.exports = { app, PORT };
