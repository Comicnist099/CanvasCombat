const Joi = require("joi");

// SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const isActive = Joi.boolean();
const id = Joi.string();
const idDraw = Joi.string();
const name = Joi.string().min(3).max(50);
const descripcion = Joi.string().min(1).max(50);
const image = Joi.object().keys({
  name: Joi.string(),
  path: Joi.string(),
  extention: Joi.string().max(13),
});
const creationDate = Joi.string();
const nicknameCom = Joi.string();

const createCommentsDto = Joi.object({
  isActive: isActive.required(),
  idDraw: idDraw.required(),
  name: name.required(),
  descripcion: descripcion.required(),
  image: image.required(),
  creationDate: creationDate.required(),
  nicknameCom: nicknameCom.required(),
});

const updateCommentsDto = Joi.object({
  isActive: isActive,
  idDraw: idDraw,
  name: name,
  descripcion: descripcion,
  image: image,
  creationDate: creationDate,
  nicknameCom: nicknameCom,
});

const getCommentsId = Joi.object({ id: id.required() });

module.exports = {
  createCommentsDto,
  updateCommentsDto,
  getCommentsId,
};
