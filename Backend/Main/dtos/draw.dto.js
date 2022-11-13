const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO

const id = Joi.string();
const isActive = Joi.boolean();
const character= Joi.string().min(3).max(50);
const owner= Joi.string().min(3).max(50);
const cartoonist=Joi.string().min(3).max(50);
const creationDate= Joi.string();
const team= Joi.string();
const body= Joi.number().integer().min(0);
const lineart= Joi.number().integer().min(0);
const detail= Joi.number().integer().min(0);
const background=Joi.number().integer().min(0);
const image= Joi.object().keys({
  name: Joi.string(),
  path: Joi.string(),
  extention: Joi.string().max(13)
});
const points= Joi.number().integer().min(0);
const descripcion= Joi.string().max(50);

const createDrawDto = Joi.object({

  isActive: isActive.required(),
  character: character.required(),
  owner: owner.required(),
  cartoonist: cartoonist.required(),
  creationDate: creationDate.required(),
  team: team.required(),
  body: body.required(),
  lineart: lineart.required(),
  detail: detail.required(),
  background: background.required(),
  image: image.required(),
  points: points.required(),
  descripcion: descripcion.required()

});

const updateDrawDto = Joi.object({
  isActive: isActive,
  character:character,
  owner:owner,
  cartoonist:cartoonist,
  creationDate:creationDate,
  team:team,
  body:body,
  lineart: lineart,
  detail:detail,
  background:background,
  image:image,
  points:points,
  descripcion: descripcion

});

const getDrawId = Joi.object({
  id: id.required(),
});

module.exports = {
  createDrawDto,
  updateDrawDto,
  getDrawId,
};
