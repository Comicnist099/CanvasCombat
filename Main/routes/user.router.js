const express = require('express');
const router = express.Router();
const UserProduct = require('../services/user.service');
const validatorHandler = require('./../middlewares/validator.handler');
const service = new UserProduct();
const {
  createUserDto,
  updateUserDto,
  getUserId,
} = require('../dtos/users.dto');

router.get('/', async (req, res) => {
  const {
    size
  } = req.query;
  const limit = size || 10;
  const Users = await service.find(limit);
  res.json(Users);
});




router.get('/perfil/:id', validatorHandler(getUserId, 'params'),
  async (req, res, next) => {

    try {
      const {
        id
      } = req.params;
      const users = await service.findOne(id);
      res.json({
        success: true,
        message: 'Found User',
        data: users,
      })
    } catch (error) {
      next(error);

    }
  });


router.post(
  '/register/',
  validatorHandler(createUserDto, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newUser = await service.create(body);
      res.json({
        success: true,
        message: 'User was created successfully',
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/perfil/:id',
  validatorHandler(getUserId, 'params'),
  validatorHandler(updateUserDto, 'body'),
  async (req, res) => {
    try {
      const {
        id
      } = req.params;
      const body = req.body;
      const users = await service.update(id, body);
      res.json({
        message: 'update',
        data: users,
        id,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
);


router.delete('/perfil/:id', validatorHandler(getUserId, 'params'),
  async (req, res) => {
    try {


      const {
        id
      } = req.params;
      const deleteUser = await service.delete(id);

      res.json({
        message: 'delete',
        product: deleteUser,
        id,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });

    }
  });


module.exports = router;
