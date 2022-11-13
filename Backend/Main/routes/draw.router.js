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


});

////////////////////////////////
//////////Comentario///////////
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
        idDraw: body2.idDraw,
        name: body2.name,
        descripcion: body2.descripcion

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

  }
);


router.delete('/comments/:id', validatorHandler(getCommentsId, 'params'),
  async (req, res) => {
    try {

      const {
        id
      } = req.params;
      //const deleteComments = await commentService.delete(id);


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

////////////////////////////////
////////////Draw////////////////

router.get('/:id', validatorHandler(getDrawId, 'params'),
  async (req, res, next) => {

    try {
      const {
        id
      } = req.params; //aquí agarra el id de la url
      let draws = await drawsModel.find();//await sirve para q se espere antes de realizar la funcion y se pueda ejecutar correctamente
      let buffer = [];
      buffer = draws;
      await drawService.generate(buffer);
      const drawsId = await drawService.findOne(id);

      res.json(
        drawsId
      )
    } catch (error) {
      next(error);
    }

    
  });


router.post('/', validatorHandler(createDrawDto, 'body'),
async (req, res, next) => {

  const {

    isActive,
    character,
    owner,
    cartoonist,
    creationDate,
    team,
    background,
    detail,
    body,
    image,
    points

  } = req.body;
  try {

    const drawsConst = new drawsModel({

      isActive,
      character,
      owner,
      cartoonist,
      creationDate,
      team,
      background,
      detail,
      body,
      image,
      points

    });
    await drawsConst.save();
    res.json({
      success: true,
      message: 'Draws was created successfully',
      data: drawsConst,
    });
  } catch (error) {
    next(error);
  }

  
});


router.patch(
  '/:id',
  validatorHandler(getDrawId, 'params'),
  validatorHandler(updateDrawDto, 'body'),
  async (req, res) => {

    try {
      const body2 = req.body;
      const drawsM = { // <-- Here
        
        isActive: body2.isActive,
        character: body2.character,
        owner: body2.owner,
        cartoonist: body2.cartoonist,
        creationDate: body2.creationDate,
        team: body2.team,
        background: body2.background,
        detail: body2.detail,
        body: body2.body,
        image: body2.image,
        points: body2.points

      }
      let draws = await drawsModel.find();//await sirve para q se espere antes de realizar la funcion y se pueda ejecutar correctamente
      let buffer = [];
      buffer = draws;
      await drawService.generate(buffer);
      await drawService.update(req.params.id, body2);
      await drawsModel.findByIdAndUpdate(req.params.id, drawsM);
      res.json(
        drawsM
      );
    } catch (error) {
      res.status(404).json({
        message: error.message,
      })
    }

  }
);


router.delete('/:id', validatorHandler(getDrawId, 'params'),
  async (req, res) => {
    try {

      const {
        id
      } = req.params;
      //const deletedraw = await service2.delete(id);

      let draws = await drawsModel.find();//await sirve para q se espere antes de realizar la funcion y se pueda ejecutar correctamente
      let buffer = [];
      buffer = draws;
      await drawService.generate(buffer);
      const deleteDraws = await drawService.delete(id);
      await drawsModel.findByIdAndRemove(id);

      res.json({
        message: 'delete',
        product: deleteDraws,
        id,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });

    }
  });


module.exports = router;