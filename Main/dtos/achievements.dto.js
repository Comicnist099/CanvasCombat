const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const isActive = Joi.boolean();
const id = Joi.string();
const name = Joi.string().min(3).max(50);
const descripcion = Joi.string().min(3).max(50);




const createAchievementsDto = Joi.object({

  isActive: isActive.required(),
  name: name.required(),
  descripcion: descripcion.required(),



});

const updateAchievementsDto = Joi.object({
  isActive: isActive,
  name:name,
  descripcion:descripcion,

});

const getAchievementsId = Joi.object({
  id: id.required(),
});

module.exports = {
  createAchievementsDto,
  updateAchievementsDto,
  getAchievementsId,
};
