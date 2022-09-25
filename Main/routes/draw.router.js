const express = require('express');
const router = express.Router();
const UserProduct = require('../services/draw.service');
const UserComments = require('../services/comment.service');
const validatorHandler = require('./../middlewares/validator.handler');
const service2 = new UserProduct();
const service = new UserComments();

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
  const {
    size
  } = req.query;
  const limit = size || 10;
  const draw = await service2.find(limit);
  res.json(draw);
});




router.get('/comments', async (req, res) => {
  const {
    size
  } = req.query;
  const limit = size || 10;
  const comments = await service.find(limit);
  res.json(comments);
});

router.get('/comments/:idDibujo', async (req, res,next) => {
try {

  const{idDibujo}=req.params;
  const comments = await service.findCommentsDraw(idDibujo);

  res.json({
    success: true,
    message: 'Found Comments',
    data: comments,
  })
} catch (error) {
  next(error);

}
});


router.post('/comments', async (req, res) => {
  const body = req.body;
  const newCreateComments = service.create(body);
  res.send({
    message: 'created',
    data: body,
  });
});

router.patch(
  '/comments/:id',
  validatorHandler(getCommentsId, 'params'),
  validatorHandler(updateCommentsDto, 'body'),
  async (req, res) => {
    try {
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
    }
  }
);


router.delete('/comments/:id', validatorHandler(getCommentsId, 'params'),
  async (req, res) => {
    try {


      const {
        id
      } = req.params;
      const deleteComments = await service.delete(id);

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
