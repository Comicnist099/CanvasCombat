const Joi = require("joi");

// SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO

const id = Joi.string();
const isActive = Joi.boolean();
const character = Joi.string().max(50);
const title = Joi.string().max(50);
const descripcion = Joi.string().max(50);
const owner = Joi.string().min(3).max(50);
const cartoonist = Joi.string().min(3).max(50);
const creationDate = Joi.string();
const team = Joi.string();
const body = Joi.string();
const lineart = Joi.string();
const detail = Joi.string();
const background = Joi.string();
const image = Joi.object().keys({name: Joi.string(), path: Joi.string(), extention: Joi.string().max(13)});

const imageProfile = Joi.object().keys({name: Joi.string(), path: Joi.string(), extention: Joi.string().max(13)});

const points = Joi.number().integer().min(0);

const createDrawDto = Joi.object({
    isActive: isActive.required(),
    character: character.required(),
    title: title.required(),
    descripcion: descripcion.required(),
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
    imageProfile: imageProfile.required()
});

const updateDrawDto = Joi.object({
    isActive: isActive,
    character: character,
    title: title,
    descripcion: descripcion,
    owner: owner,
    cartoonist: cartoonist,
    creationDate: creationDate,
    team: team,
    body: body,
    lineart: lineart,
    detail: detail,
    background: background,
    image: image,
    imageProfile: imageProfile,
    points: points

});

const getDrawId = Joi.object({id: id.required()});

module.exports = {
    createDrawDto,
    updateDrawDto,
    getDrawId
};
