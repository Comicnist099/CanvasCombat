const Joi = require('joi');


//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const isActive = Joi.boolean();
const id = Joi.string();
const character= Joi.string().min(3).max(50);
const owner= Joi.string().min(3).max(50);
const cartoonist=Joi.string().min(3).max(50);
const creationDate= Joi.string();
const team= Joi.string();
const background=Joi.number().integer().min(0);
const detail= Joi.number().integer().min(0);
const body= Joi.number().integer().min(0);
const image= Joi.string();
const points= Joi.number().integer().min(10);



const createDrawDto = Joi.object({

  isActive: isActive.required(),
  character:character.required(),
  owner:owner.required(),
  cartoonist:cartoonist.required(),
  creationDate:creationDate.required(),
  team:team.required(),
  background:background.required(),
  detail:detail.required(),
  body:body.required(),
  image:image.required(),
  points:points.required()


});

const updateDrawDto = Joi.object({
  isActive: isActive,
  character:character,
  owner:owner,
  cartoonist:cartoonist,
  creationDate:creationDate,
  team:team,
  background:background,
  detail:detail,
  body:body,
  image:image,
  points:points,


});

const getDrawId = Joi.object({
  id: id.required(),
});

module.exports = {
  createDrawDto,
  updateDrawDto,
  getDrawId,
};
