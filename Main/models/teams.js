const { boolean } = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const teamSchema = new Schema({

  isActive: { type: Boolean, required: true },
  name: { type: String, required: true },
  descripcion: { type: String, required: true }

});

module.exports = mongoose.model('teams', teamSchema);
