const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const isActive = Joi.boolean();
const id = Joi.string();
const name = Joi.string().min(3).max(50);
const descripcion = Joi.string().min(3).max(50);




const createTeamsDto = Joi.object({

  isActive: isActive.required(),
  name: name.required(),
  descripcion: descripcion.required(),



});

const updateTeamsDto = Joi.object({
  isActive: isActive,
  name:name,
  descripcion:descripcion,

});

const getTeamsId = Joi.object({
  id: id.required(),
});

module.exports = {
  createTeamsDto,
  updateTeamsDto,
  getTeamsId,
};
