const express = require('express');
const router = express.Router();
const validatorHandler = require('./../middlewares/validator.handler');

const DrawsProduct = require('../services/draw.service');
const UserComments = require('../services/comment.service');
const drawsModel = require('../models/draw');
const commentsModel = require('../models/comment');

const drawService = new DrawsProduct();
const commentService = new UserComments();

const {
  createDrawDto,
  updateDrawDto,
  getDrawId,
} = require('../dtos/draw.dto');

const {
  createCommentsDto,
  updateCommentsDto,
  getCommentsId,
} = require('../dtos/comment.dto');


router.get('/', async (req, res) => {

  let draws = await drawsModel.find();
  let buffer = [];
  buffer = draws;
  await drawService.generate(buffer);
  res.json(draws);

});

router.get('/comments', async (req, res) => {

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

//////
router.get('/comments/:idDibujo', validatorHandler(getCommentsId, 'params'),
async (req, res, next) => {

  try {
    const {
      idDibujo
    } = req.params; 
    let comments = await commentsModel.find();
    let buffer = [];
    buffer = comments;
    await commentService.generate(buffer);
    const commentsId = await commentService.findCommentsDraw(idDibujo);

    res.json(
      commentsId
    )
  } catch (error) {
    next(error);
  }

 /*  try {
  const{ idDibujo }=req.params;
  const comments = await commentService.findCommentsDraw(idDibujo);

  res.json({
    success: true,
    message: 'Found Comments',
    data: comments,
  })
} catch (error) {
  next(error);

} */
});


router.post('/comments', validatorHandler(createCommentsDto, 'body'),
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
      message: 'Comment was created successfully',
      data: commentsConst,
    });
  } catch (error) {
    next(error);
  }

  /* const body = req.body;
  const newCreateComments = commentService.create(body);
  res.send({
    message: 'created',
    data: body,
  }); */
});

router.patch(
  '/comments/:id',
  validatorHandler(getCommentsId, 'params'),
  validatorHandler(updateCommentsDto, 'body'),
  async (req, res) => {

    try {
      const body2 = req.body;
      const commentsM = { // <-- Here
        isActive: body2.isActive,
        name: body2.name,
        descripcion: body2.descripcion,
        points: body2.points,
        image: body2.image

      }
      let comments = await commentsModel.find();//await sirve para q se espere antes de realizar la funcion y se pueda ejecutar correctamente
      let buffer = [];
      buffer = comments;
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


   /*  try {
      const {
        id
      } = req.params;
      const body = req.body;
      const comments = await commentService.update(id, body);
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


router.delete('/comments/:id', validatorHandler(getCommentsId, 'params'),
  async (req, res) => {
    try {

      const {
        id
      } = req.params;
      const deleteComments = await commentService.delete(id);

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

////////////////////////////////
////////////Draw////////////////

router.get('/:id', validatorHandler(getDrawId, 'params'),
  async (req, res, next) => {

    try {
      const {  id  } = req.params;
      const draw = await service2.findOne(id);
      res.json({
        success: true,
        message: 'Found User',
        data: draw,
      })
    } catch (error) {
      next(error);

    }
  });


router.post('/', async (req, res) => {
  const body = req.body;
  const newCreateDraw = service2.create(body);
  res.send({
    message: 'created',
    data: body,
  });
});
router.patch(
  '/:id',
  validatorHandler(getDrawId, 'params'),
  validatorHandler(updateDrawDto, 'body'),
  async (req, res) => {
    try {
      const {
        id
      } = req.params;
      const body = req.body;
      const draw = await service2.update(id, body);
      res.json({
        message: 'update',
        data: draw,
        id,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
);


router.delete('/:id', validatorHandler(getDrawId, 'params'),
  async (req, res) => {
    try {


      const {
        id
      } = req.params;
      const deletedraw = await service2.delete(id);

      res.json({
        message: 'delete',
        product: deletedraw,
        id,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });

    }
  });


module.exports = router;