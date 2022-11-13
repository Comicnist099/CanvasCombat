const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const isActive = Joi.boolean();
const id = Joi.string();
const idDraw = Joi.string();
const name = Joi.string().min(3).max(50);
const descripcion = Joi.string().min(3).max(50);


const createCommentsDto = Joi.object({

  isActive: isActive.required(),
  idDraw:idDraw.required(),
  name: name.required(),
  descripcion: descripcion.required(),

});

const updateCommentsDto = Joi.object({
  isActive: isActive,
  idDraw:idDraw,
  name:name,
  descripcion:descripcion,

});

const getCommentsId = Joi.object({
  id: id.required(),
});

module.exports = {
  createCommentsDto,
  updateCommentsDto,
  getCommentsId,
};
