const express = require('express');
const router = express.Router();
const drawService = require('../services/draw.service');
const service = new drawService();

router.get('/', async (req, res) => {
  const { size } = req.query;
  const limit = size || 10;
  const products = service.find(limit);
  res.json(products);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id);
  res.json({
    message: 'Found Draw',
    product: product,
  });
});

router.post('/', async (req, res) => {
  const body = req.body;
  const NewCreateProduct=service.create(body);
  res.send({
    message: 'created draw',
    data: body,
  });
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const UpdateProduct= await service.update(id,body);

  res.json({
    message: 'update draw',
    data: UpdateProduct,
    id,
  });
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleteProduct= await service.delete(id);

  res.json({
    message: 'delete draw',
    product:deleteProduct,
    id,
  });
});

module.exports = router;


