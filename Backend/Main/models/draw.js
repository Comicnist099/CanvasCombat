//const { boolean } = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const drawSchema = new Schema({

    isActive: { type: Boolean, required: true },
    character: { type: String, required: true },
    owner: { type: String, required: true },
    cartoonist: { type: String, required: true },
    creationDate: { type: String, required: true },
    team: { type: String, required: true },
    body: { type: Number, required: true },
    lineart: { type: Number, required: true },
    detail: { type: Number, required: true },
    background: { type: Number, required: true },
    image: { type: Object, required: true },
    points: { type: Number, required: true },
    descripcion: { type: String, required: true }

});

module.exports = mongoose.model('draw', drawSchema);
