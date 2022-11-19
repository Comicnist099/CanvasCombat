// const { boolean } = require('joi');
const mongoose = require('mongoose');
const {Schema} = mongoose;

const drawSchema = new Schema({

    isActive: {
        type: Boolean,
        required: true
    },
    character: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    cartoonist: {
        type: String,
        required: true
    },
    creationDate: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    lineart: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    background: {
        type: String,
        required: true
    },
    image: {
        type: Object,
        required: true
    },
    imageProfile: {
        type: Object,
        required: true
    },
    points: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('draw', drawSchema);
