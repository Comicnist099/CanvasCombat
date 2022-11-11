const userRouter = require('./user.router');
const drawRouter = require('./draw.router');
const achievementsRouter = require('./achievements.router');
const commentRouter = require('./comment.router');
const teamsRouter = require('./teams.router');
const cors = require('cors');
const express = require('express');
const router = express.Router();



function routerApi(app) {
  app.use(cors());
  app.use('/', router);
  router.use('/users', userRouter);
  router.use('/draw', drawRouter);
  router.use('/achievements', achievementsRouter);
  router.use('/comment', commentRouter);
  router.use('/teams', teamsRouter);

}

module.exports = routerApi;
