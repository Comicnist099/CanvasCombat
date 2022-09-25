const express = require('express');
const router = express.Router();
const UserProduct = require('../services/achievements.service');
const validatorHandler = require('./../middlewares/validator.handler');
const service = new UserProduct();
const {
  createAchievementsDto,
  updateAchievementsDto,
  getAchievementsId,
} = require('../dtos/achievements.dto');

router.get('/', async (req, res) => {
  const {
    size
  } = req.query;
  const limit = size || 10;
  const achievements = await service.find(limit);
  res.json(achievements);
});




router.get('/:id', validatorHandler(getAchievementsId, 'params'),
  async (req, res, next) => {

    try {
      const {
        id
      } = req.params;
      const achievements = await service.findOne(id);
      res.json({
        success: true,
        message: 'Found User',
        data: achievements,
      })
    } catch (error) {
      next(error);

    }
  });


router.post('/', async (req, res) => {
  const body = req.body;
  const newCreateAchievements = service.create(body);
  res.send({
    message: 'created',
    data: body,
  });
});
router.patch(
  '/:id',
  validatorHandler(getAchievementsId, 'params'),
  validatorHandler(updateAchievementsDto, 'body'),
  async (req, res) => {
    try {
      const {
        id
      } = req.params;
      const body = req.body;
      const achievements = await service.update(id, body);
      res.json({
        message: 'update',
        data: achievements,
        id,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
);


router.delete('/:id', validatorHandler(getAchievementsId, 'params'),
  async (req, res) => {
    try {


      const {
        id
      } = req.params;
      const deleteAchievements = await service.delete(id);

      res.json({
        message: 'delete',
        product: deleteAchievements,
        id,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });

    }
  });


module.exports = router;
