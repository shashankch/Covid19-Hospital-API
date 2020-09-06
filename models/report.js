// import mongoose odm module
const mongoose = require('mongoose');

// creating the report schema
const reportSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
    },
    status: {
      type: String,
      required: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
// creating model from schema
const Report = mongoose.model('Report', reportSchema);

// export the model
module.exports = Report;
