const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dibujoSchema = new Schema({

  nombre:String,
  propietario:String,
  dibujante:String,
  fecha_publicacion:String,
  team:String


})

const dibujo=mongoose.model('dibujo', dibujoSchema);

module.exports = dibujo;
