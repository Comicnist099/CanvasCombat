const express = require('express');
const router = express.Router();
const TeamsProduct = require('../services/teams.service');
const validatorHandler = require('./../middlewares/validator.handler');

const teamService = new TeamsProduct();
const teamsModel = require('../models/teams');

const {
  createTeamsDto,
  updateTeamsDto,
  getTeamsId,
} = require('../dtos/teams.dto');

router.get('/', async (req, res) => {

  let teams = await teamsModel.find();//await sirve para q se espere antes de realizar la funcion y se pueda ejecutar correctamente
  let buffer = [];
  buffer = teams;
  await teamService.generate(buffer);
  res.json(teams);

});

router.get('/:id', validatorHandler(getTeamsId, 'params'),
  async (req, res, next) => {

    try {
      const {
        id
      } = req.params; //aquí agarra el id de la url
      let teams = await teamsModel.find();//await sirve para q se espere antes de realizar la funcion y se pueda ejecutar correctamente
      let buffer = [];
      buffer = teams;
      await teamService.generate(buffer);
      const teamsId = await teamService.findOne(id);

      res.json(
        teamsId
      )
    } catch (error) {
      next(error);
    }

  });


router.post('/', validatorHandler(createTeamsDto, 'body'),
async (req, res, next) => {

  const {
    isActive,
    name,
    descripcion,
    points,
    image

  } = req.body;
  try {

    const teamsConst = new teamsModel({
      isActive,
      name,
      descripcion,
      points,
      image

    });
    await teamsConst.save();
    res.json({
      success: true,
      message: 'Teams was created successfully',
      data: teamsConst,
    });
  } catch (error) {
    next(error);
  }

});


router.patch(
  '/:id',
  validatorHandler(getTeamsId, 'params'),
  validatorHandler(updateTeamsDto, 'body'),
  async (req, res) => {

    try {
      const body2 = req.body;
      const teamsM = { // <-- Here
        isActive: body2.isActive,
        name: body2.name,
        descripcion: body2.descripcion,
        points: body2.points,
        image: body2.image

      }
      let teams = await teamsModel.find();//await sirve para q se espere antes de realizar la funcion y se pueda ejecutar correctamente
      let buffer = [];
      buffer = teams;
      await teamService.generate(buffer);
      await teamService.update(req.params.id, body2);
      await teamsModel.findByIdAndUpdate(req.params.id, teamsM);
      res.json(
        teamsM
      );
    } catch (error) {
      res.status(404).json({
        message: error.message,
      })
    }

  }
);


router.delete('/:id', validatorHandler(getTeamsId, 'params'),
  async (req, res) => {

    try {
      const {
        id
      } = req.params;

      let teams = await teamsModel.find();//await sirve para q se espere antes de realizar la funcion y se pueda ejecutar correctamente
      let buffer = [];
      buffer = teams;
      await teamService.generate(buffer);
      const deleteTeams = await teamService.delete(id);
      await teamsModel.findByIdAndRemove(id);

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
