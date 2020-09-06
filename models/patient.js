// import mongoose odm module
const mongoose = require('mongoose');

// creating the patient schema
const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
      unique: true,
    },

    reports:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Report',
    }],
  },
  {
    timestamps: true,
  },
);
// creating model from schema
const Patient = mongoose.model('Patient', patientSchema);

// export the model
module.exports = Patient;
