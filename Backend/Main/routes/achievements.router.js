const express = require("express");
const router = express.Router();
const achievementsProduct = require("../services/achievements.service");
const validatorHandler = require("./../middlewares/validator.handler");

const achievementService = new achievementsProduct();
const achievementsModel = require("../models/achievements");

const {
  createAchievementsDto,
  updateAchievementsDto,
  getAchievementsId,
} = require("../dtos/achievements.dto");

router.get("/", async (req, res) => {
  let achievements = await achievementsModel.find(); //await sirve para q se espere antes de realizar la funcion y se pueda ejecutar correctamente
  let buffer = [];
  buffer = achievements;
  await achievementService.generate(buffer);
  res.json(achievements);
});

router.get(
  "/:id",
  validatorHandler(getAchievementsId, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      let achievements = await achievementsModel.find();
      let buffer = [];
      buffer = achievements;
      await achievementService.generate(buffer);
      const achievementsId = await achievementService.findOne(id);

      res.json(achievementsId);
    } catch (error) {
      next(error);
    }

    /* try {
      const {
        id
      } = req.params;
      const achievements = await service.findOne(id);
      res.json({
        success: true,
        message: 'Found User',
        data: achievements,
      })
    } catch (error) {
      next(error);
    } */
  }
);

router.post(
  "/",
  validatorHandler(createAchievementsDto, "body"),
  async (req, res, next) => {
    const { isActive, name, descripcion } = req.body;
    try {
      const achievementsConst = new achievementsModel({
        isActive,
        name,
        descripcion,
      });
      await achievementsConst.save();
      res.json({
        success: true,
        message: "Achievements was created successfully",
        data: achievementsConst,
      });
    } catch (error) {
      next(error);
    }

    /* const body = req.body;
  const newCreateAchievements = service.create(body);
  res.send({
    message: 'created',
    data: body,
  }); */
  }
);

router.patch(
  "/:id",
  validatorHandler(getAchievementsId, "params"),
  validatorHandler(updateAchievementsDto, "body"),
  async (req, res) => {
    try {
      const body2 = req.body;
      const achievementsM = {
        // <-- Here
        isActive: body2.isActive,
        name: body2.name,
        descripcion: body2.descripcion,
      };
      let teams = await achievementsModel.find(); //await sirve para q se espere antes de realizar la funcion y se pueda ejecutar correctamente
      let buffer = [];
      buffer = teams;
      await achievementService.generate(buffer);
      await achievementService.update(req.params.id, body2);
      await achievementsModel.findByIdAndUpdate(req.params.id, achievementsM);
      res.json(achievementsM);
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }

    /* try {
      const {
        id
      } = req.params;
      const body = req.body;
      const achievements = await service.update(id, body);
      res.json({
        message: 'update',
        data: achievements,
        id,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    } */
  }
);

router.delete(
  "/:id",
  validatorHandler(getAchievementsId, "params"),
  async (req, res) => {
    try {
      const { id } = req.params;
      //const deleteAchievements = await service.delete(id);

      let teams = await achievementsModel.find(); //await sirve para q se espere antes de realizar la funcion y se pueda ejecutar correctamente
      let buffer = [];
      buffer = teams;
      await achievementService.generate(buffer);
      const deleteAchievements = await achievementService.delete(id);
      await achievementsModel.findByIdAndRemove(id);

      res.json({
        message: "delete",
        product: deleteAchievements,
        id,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;
