const express = require('express');
const router = express.Router();
const UserComments = require('../services/comment.service');
const validatorHandler = require('./../middlewares/validator.handler');
const service = new UserComments();
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
  const comments = await service.find(limit);
  res.json(comments);
});




router.get('/:id', validatorHandler(getCommentsId, 'params'),
  async (req, res, next) => {

    try {
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

    }
  });


router.post('/', async (req, res) => {
  const body = req.body;
  const newCreateComments = service.create(body);
  res.send({
    message: 'created',
    data: body,
  });
});
router.patch(
  '/:id',
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


router.delete('/:id', validatorHandler(getCommentsId, 'params'),
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


module.exports = router;

