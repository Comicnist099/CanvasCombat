const express = require('express');
const router = express.Router();
const UserProduct = require('../services/user.service');
const validatorHandler = require('./../middlewares/validator.handler');
const service = new UserProduct();

const User = require('../models/user');


//shortcut para comentar en bloque: shift + alt + a

const {
  createUserDto,
  updateUserDto,
  getUserId,
} = require('../dtos/users.dto');


//Sirve para obtener los valores
router.get('/', async (req, res) => {
  let user = await User.find();//await sirve para q se espere antes de realizar la funcion y se pueda ejecutar correctamente
  let buffer = [];
  buffer = user;
  await service.generate(buffer);
  res.json(user);

});

router.get('/Login', async (req, res, next) => {

  try {
;
    const { size, e, p } = req.query;
    const filter = {};

    if (e) {
      Object.assign(filter, {
        email: e
      })
    }

    if (p) {
      Object.assign(filter, {
        password: p
      })
    }
   
    let userSearch = await User.find(filter);
    const users = await service.find2(size || 10, userSearch)
    res.json({
      'success': true,
      'message': 'Estos son los usuarios encontrados',
      'Data': users
    });

  } catch (error) {
    next(error);
  }

});


router.get('/:id', validatorHandler(getUserId, 'params'),
  async (req, res, next) => {
    try {
      const {
        id
      } = req.params; //aquí agarra el id de la url
      let user = await User.find();//await sirve para q se espere antes de realizar la funcion y se pueda ejecutar correctamente
      let buffer = [];
      buffer = user;
      await service.generate(buffer);
      const users = await service.findOne(id);

      res.json(
        users
      )
    } catch (error) {
      next(error);

    }
  });


router.post('/', validatorHandler(createUserDto, 'body'),
  async (req, res, next) => {
    const {
      isActive,
      nameUser,
      nickname,
      email,
      password,
      creationDate,
      team,
      facebook,
      instagram,
      extra,
      image,
      points,
      ban,
      typeUser,
      achievements1,
      achievements2,
      achievements3,
      achievements4,
      achievements5,
      achievements6,
      achievements7,
      achievements8,
      achievements9,
      achievements10,
      achievements11
    } = req.body;
    try {

      const user = new User({
        isActive,
        nameUser,
        nickname,
        email,
        password,
        creationDate,
        team,
        facebook,
        instagram,
        extra,
        image,
        points,
        ban,
        typeUser,
        achievements1,
        achievements2,
        achievements3,
        achievements4,
        achievements5,
        achievements6,
        achievements7,
        achievements8,
        achievements9,
        achievements10,
        achievements11
      });
      await user.save();
      res.json({
        success: true,
        message: 'User was created successfully',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  });

router.patch(
  '/:id',
  validatorHandler(getUserId, 'params'),
  validatorHandler(updateUserDto, 'body'),
  async (req, res) => {

    try {
      const body2 = req.body;
      const usersM = { // <-- Here
        isActive: body2.isActive,
        nameUser: body2.nameUser,
        nickname: body2.nickname,
        email:body2.email,
        password: body2.password,
        creationDate: body2.creationDate,
        team: body2.team,
        facebook: body2.facebook,
        instagram: body2.instagram,
        extra: body2.extra,
        image: body2.image,
        points: body2.points,
        ban: body2.ban,
        typeUser: body2.typeUser,
        achievements1: body2.achievements1,
        achievements2: body2.achievements2,
        achievements3: body2.achievements3,
        achievements4: body2.achievements4,
        achievements5: body2.achievements5,
        achievements6: body2.achievements6,
        achievements7: body2.achievements7,
        achievements8: body2.achievements8,
        achievements9: body2.achievements9,
        achievements10: body2.achievements10,
        achievements11: body2.achievements11
      }
      let user = await User.find();//await sirve para q se espere antes de realizar la funcion y se pueda ejecutar correctamente
      let buffer = [];
      buffer = user;
      await service.generate(buffer);
      await service.update(req.params.id, body2);
      await User.findByIdAndUpdate(req.params.id, usersM);
      res.json(
        usersM
      );
    } catch (error) {
      res.status(404).json({
        message: error.message,
      })
    }
  });

router.delete('/:id', validatorHandler(getUserId, 'params'),
  async (req, res) => {

    try {
      const {
        id
      } = req.params;//let es lo contrario a const
      let user = await User.find();//await sirve para q se espere antes de realizar la funcion y se pueda ejecutar correctamente
      let buffer = [];
      buffer = user;
      await service.generate(buffer);
      const deleteUser = await service.delete(id);
      await User.findByIdAndRemove(id);
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
