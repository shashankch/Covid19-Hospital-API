const Patient = require('../../../models/patient');
const Report = require('../../../models/report');
const Doctor = require('../../../models/doctor');
const jwt = require('jsonwebtoken');

module.exports.register = async (req, res) => {
  try {
    let patient = await Patient.findOne({ contact: req.body.contact });

    if (!patient) {
      let newPatient = await Patient.create(req.body);

      // let patObj = patient.toObject();
      // delete patObj.contact;

      return res.status(200).json({
        data: {
          patient: newPatient,
        },
        message: 'Registration Success!',
      });
    } else {
      // let patObj = patient.toObject();
      // delete patObj.contact;

      return res.status(200).json({
        data: {
          patient: patient,
        },
        message: 'Already registered with us!',
      });
    }
  } catch (error) {
    console.log('***', err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

module.exports.createReport = async (req, res) => {
  try {
    let doctor = await Doctor.findById(req.user._id);
    let patient = await Patient.findById(req.params.id);

    if (
      [
        'Negative',
        'Travelled-Quarantine',
        'Symptoms-Quarantine',
        'Positive-Admit',
      ].includes(req.body.status.toString()) == false
    ) {
      console.log('going inside ###########');
      return res.status(422).json({
        message: 'Invalid Input',
      });
    }
    if (patient && doctor) {
      let report = await Report.create({
        doctor: doctor,
        status: req.body.status,
        patient: patient,
        date: Date.now().toString(),
      });

      await patient.reports.push(report);
      await patient.save();
    }
    return res.status(200).json({
      message: 'Report created!',
    });
  } catch (error) {
    console.log('***', err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

module.exports.allReports = async (req, res) => {
  try {
    let reports = await Report.find({ patient: req.params.id })
      .sort('createdAt')
      .populate('doctor', 'name email')
      .populate('patient','name contact');

    return res.status(200).json({
      message: 'list of reports',
      reports: reports,
    });
  } catch (error) {
    console.log('***', err);
    return res.json(500, {
      message: 'Internal Server Error',
    });
  }
};
