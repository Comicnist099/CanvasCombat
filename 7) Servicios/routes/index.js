const userRouter = require('./user.router');
const drawRouter = require('./draw.router');
const achievementsRouter = require('./achievements.router');

const express = require('express');

function routerApi(app) {
  const router = express.Router();
  app.use('/CanvasCombat', router);
  router.use('/users', userRouter);
  router.use('/draw', drawRouter);
  router.use('/achievements', achievementsRouter);
}

module.exports = routerApi;
