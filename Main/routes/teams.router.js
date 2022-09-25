const express = require('express');
const router = express.Router();
const UserProduct = require('../services/teams.service');
const validatorHandler = require('./../middlewares/validator.handler');
const service = new UserProduct();
const {
  createTeamsDto,
  updateTeamsDto,
  getTeamsId,
} = require('../dtos/teams.dto');

router.get('/', async (req, res) => {
  const {
    size
  } = req.query;
  const limit = size || 10;
  const teams = await service.find(limit);
  res.json(teams);
});




router.get('/:id', validatorHandler(getTeamsId, 'params'),
  async (req, res, next) => {

    try {
      const {
        id
      } = req.params;
      const teams = await service.findOne(id);
      res.json({
        success: true,
        message: 'Found User',
        data: teams,
      })
    } catch (error) {
      next(error);

    }
  });


router.post('/', async (req, res) => {
  const body = req.body;
  const newCreateTeams = service.create(body);
  res.send({
    message: 'created',
    data: body,
  });
});
router.patch(
  '/:id',
  validatorHandler(getTeamsId, 'params'),
  validatorHandler(updateTeamsDto, 'body'),
  async (req, res) => {
    try {
      const {
        id
      } = req.params;
      const body = req.body;
      const teams = await service.update(id, body);
      res.json({
        message: 'update',
        data: teams,
        id,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
);


router.delete('/:id', validatorHandler(getTeamsId, 'params'),
  async (req, res) => {
    try {


      const {
        id
      } = req.params;
      const deleteTeams = await service.delete(id);

      res.json({
        message: 'delete',
        product: deleteTeams,
        id,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });

    }
  });


module.exports = router;
