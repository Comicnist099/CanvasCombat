const express = require('express');
const router = express.Router();
const archivementsService = require('../services/achievements.service');
const service = new archivementsService();

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
    message: 'Found achievements',
    product: product,
  });
});

router.post('/', async (req, res) => {
  const body = req.body;
  const NewCreateAchievements=service.create(body);
  res.send({
    message: 'created achievements',
    data: body,
  });
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const UpdateAchievements= await service.update(id,body);

  res.json({
    message: 'update achievements',
    data: UpdateAchievements,
    id,
  });
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleteAchievements= await service.delete(id);

  res.json({
    message: 'delete achievements',
    product:deleteAchievements,
    id,
  });
});

module.exports = router;


