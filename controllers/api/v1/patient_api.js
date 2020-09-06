// import patient model
const Patient = require('../../../models/patient');

// import report model
const Report = require('../../../models/report');

// import doctor model
const Doctor = require('../../../models/doctor');

// controller action to register patient using name and contact no.
module.exports.register = async (req, res) => {
  try {
    // check if already registered
    let patient = await Patient.findOne({ contact: req.body.contact });

    // creating new patient
    if (!patient) {
      let newPatient = await Patient.create(req.body);

      // let patObj = patient.toObject();
      // delete patObj.contact;

      // sending success response on registration with details
      return res.status(200).json({
        data: {
          patient: newPatient,
        },
        message: 'Registration Success!',
      });
    } else {
      // let patObj = patient.toObject();
      // delete patObj.contact;

      // sending response with message if already registered.
      return res.status(200).json({
        data: {
          patient: patient,
        },
        message: 'Already registered with us!',
      });
    }
  } catch (error) {
    // sending error response on request failure
    console.log('***', err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

// controller action to create patient's report by authorized/authenticated/registered(jWT) doctor
module.exports.createReport = async (req, res) => {
  try {
    // find current authorized/authenticated doctor
    let doctor = await Doctor.findById(req.user._id);

    // find patient by id passed in params
    let patient = await Patient.findById(req.params.id);

    // check if report status sent in request follows the possible standard report-results.
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

    // check if both are valid and present then creating report with info passed in request
    if (patient && doctor) {
      let report = await Report.create({
        doctor: doctor,
        status: req.body.status,
        patient: patient,
        date: Date.now().toString(),
      });

      // inserting the newly created report object in patient's report array of objects.
      await patient.reports.push(report);
      await patient.save();
    }

    // sending the success response message
    return res.status(200).json({
      message: 'Report created!',
    });
  } catch (error) {
    // sending error response message on request failure
    console.log('***', err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

// controller action to return  all reports present in db from oldest to latest..
// removed sensitive info like password from response result.
module.exports.allReports = async (req, res) => {
  try {
    let reports = await Report.find({ patient: req.params.id })
      .sort('createdAt')
      .populate('doctor', 'name email')
      .populate('patient', 'name contact');

    return res.status(200).json({
      message: 'list of reports',
      reports: reports,
    });
  } catch (error) {
    // send error response on req fail
    console.log('***', err);
    return res.json(500, {
      message: 'Internal Server Error',
    });
  }
};
