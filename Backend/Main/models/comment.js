//const { boolean } = require('joi');
const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  isActive: { type: Boolean, required: true },
  idDraw: { type: String, required: true },
  name: { type: String, required: true },
  descripcion: { type: String, required: true },
});

module.exports = mongoose.model("comment", commentSchema);
