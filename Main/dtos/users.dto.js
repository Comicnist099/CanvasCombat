const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const isActive = Joi.boolean();
const id = Joi.string();

const nameUser = Joi.string().min(3).max(50);
const nickname = Joi.string().min(3).max(50);
const email=Joi.string();
const pass= Joi.string();

const creationDate = Joi.string();
const team = Joi.string();
const facebook = Joi.string();
const instagram = Joi.string();
const extra = Joi.string();
const image = Joi.string();
const points = Joi.number();
const ban = Joi.boolean();
const typeUser = Joi.boolean();

const achievements1= Joi.boolean();
const achievements2= Joi.boolean();
const achievements3= Joi.boolean();
const achievements4= Joi.boolean();
const achievements5= Joi.boolean();
const achievements6= Joi.boolean();
const achievements7= Joi.boolean();
const achievements8= Joi.boolean();
const achievements9= Joi.boolean();
const achievements10= Joi.boolean();
const achievements11= Joi.boolean();




const createUserDto = Joi.object({

  isActive: isActive.required(),
  nameUser: nameUser.required(),
  nickname: nickname.required(),
  email:email.required(),
  pass:pass.required(),

  creationDate: creationDate.required(),
  team: team.required(),
  facebook: facebook.required(),
  instagram: instagram.required(),
  extra: extra.required(),
  image: image.required(),
  points: points.required(),
  ban: ban.required(),
  typeUser: typeUser.required(),

  achievements1:achievements1.required(),
  achievements2:achievements2.required(),
  achievements3:achievements3.required(),
  achievements4:achievements4.required(),
  achievements5:achievements5.required(),
  achievements6:achievements6.required(),
  achievements7:achievements7.required(),
  achievements8:achievements8.required(),
  achievements9:achievements9.required(),
  achievements10:achievements10.required(),
  achievements11:achievements11.required(),



});

const updateUserDto = Joi.object({
  isActive: isActive,
  nameUser:nameUser,
  nickname: nickname,
  email:email,
  pass:pass,
  creationDate:creationDate,
  team: team,
  facebook: facebook,
  instagram: instagram,
  extra: extra,
  image:image,
  points: points,
  ban: ban,
  typeUser: typeUser,


  achievements1:achievements1,
  achievements2:achievements2,
  achievements3:achievements3,
  achievements4:achievements4,
  achievements5:achievements5,
  achievements6:achievements6,
  achievements7:achievements7,
  achievements8:achievements8,
  achievements9:achievements9,
  achievements10:achievements10,
  achievements11:achievements11,

});

const getUserId = Joi.object({
  id: id.required(),
});

module.exports = {
  createUserDto,
  updateUserDto,
  getUserId,
};
