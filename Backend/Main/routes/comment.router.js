const express = require('express');
const router = express.Router();
const UserComments = require('../services/comment.service');
const validatorHandler = require('./../middlewares/validator.handler');

const commentService = new UserComments();
const commentsModel = require('../models/comment');

const {
  createCommentsDto,
  updateCommentsDto,
  getCommentsId,
} = require('../dtos/comment.dto');

router.get('/', async (req, res) => {

  let comments = await commentsModel.find();
  let buffer = [];
  buffer = comments;
  await commentService.generate(buffer);
  res.json(comments);

 /*  const {
    size
  } = req.query;
  const limit = size || 10;
  const comments = await service.find(limit);
  res.json(comments); */
});

router.get('/:id', validatorHandler(getCommentsId, 'params'),
  async (req, res, next) => {

    try {
      const {
        id
      } = req.params; 
      let comments = await commentsModel.find();
      let buffer = [];
      buffer = comments;
      await commentService.generate(buffer);
      const commentsId = await commentService.findOne(id);

      res.json(
        commentsId
      )
    } catch (error) {
      next(error);
    }

   /*  try {
      const {
        id
      } = req.params;
      const comments = await service.findOne(id);
      res.json({
        success: true,
        message: 'Found User',
        data: comments,
      })
    } catch (error) {
      next(error);

    } */
  });

router.post('/', validatorHandler(createCommentsDto, 'body'),
async (req, res, next) => {

  const {
    isActive,
    idDraw,
    name,
    descripcion

  } = req.body;
  try {

    const commentsConst = new commentsModel({
      isActive,
      idDraw,
      name,
      descripcion

    });
    await commentsConst.save();
    res.json({
      success: true,
      message: 'Comments was created successfully',
      data: commentsConst,
    });
  } catch (error) {
    next(error);
  }

  /* const body = req.body;
  const newCreateComments = service.create(body);
  res.send({
    message: 'created',
    data: body,
  });*/

}); 


router.patch(
  '/:id',
  validatorHandler(getCommentsId, 'params'),
  validatorHandler(updateCommentsDto, 'body'),
  async (req, res) => {

    try {
      const body2 = req.body;
      const commentsM = { // <-- Here
        isActive: body2.isActive,
        idDraw: body2.idDraw,
        name: body2.name,
        descripcion: body2.descripcion

      }
      let teams = await commentsModel.find();//await sirve para q se espere antes de realizar la funcion y se pueda ejecutar correctamente
      let buffer = [];
      buffer = teams;
      await commentService.generate(buffer);
      await commentService.update(req.params.id, body2);
      await commentsModel.findByIdAndUpdate(req.params.id, commentsM);
      res.json(
        commentsM
      );
    } catch (error) {
      res.status(404).json({
        message: error.message,
      })
    }

    /* try {
      const {
        id
      } = req.params;
      const body = req.body;
      const comments = await service.update(id, body);
      res.json({
        message: 'update',
        data: comments,
        id,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    } */
  }

);


router.delete('/:id', validatorHandler(getCommentsId, 'params'),
  async (req, res) => {
    try {

      const {
        id
      } = req.params;

      let comments = await commentsModel.find();//await sirve para q se espere antes de realizar la funcion y se pueda ejecutar correctamente
      let buffer = [];
      buffer = comments;
      await commentService.generate(buffer);
      const deleteComments = await commentService.delete(id);
      await commentsModel.findByIdAndRemove(id);

      res.json({
        message: 'delete',
        product: deleteComments,
        id,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });

    }
  });


module.exports = router;

