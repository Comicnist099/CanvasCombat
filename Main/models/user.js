const { boolean } = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({

  isActive: { type: Boolean, required: true },
  nameUser: { type: String, required: true },
  nickname: { type: String, required: true },
  creationDate:  { type: String, required: true },
  team: { type: String, required: true },
  facebook: { type: String, required: true },
  instagram:  { type: String, required: true },
  extra:  { type: String, required: true },
  image: { type: String, required: true },
  points:  { type: String, required: true },
  ban:  { type: Boolean, required: true },
  typeUser: { type: Boolean, required: true },

  achievements1: { type: Boolean, required: true },
  achievements2: { type: Boolean, required: true },
  achievements3: { type: Boolean, required: true },
  achievements4: { type: Boolean, required: true },
  achievements5: { type: Boolean, required: true },
  achievements6: { type: Boolean, required: true },
  achievements7: { type: Boolean, required: true },
  achievements8: { type: Boolean, required: true },
  achievements9: { type: Boolean, required: true },
  achievements10: { type: Boolean, required: true },
  achievements11: { type: Boolean, required: true }
});

module.exports = mongoose.model('users', UserSchema);
