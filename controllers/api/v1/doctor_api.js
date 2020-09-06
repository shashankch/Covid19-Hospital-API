const Doctor = require('../../../models/doctor');
const jwt = require('jsonwebtoken');

module.exports.register = async (req, res) => {
  try {
    let doctor = await Doctor.findOne({ email: req.body.email });

    if (!doctor) {
      let newDoctor = await Doctor.create(req.body);

      let newDoctorObj = newDoctor.toObject();
      delete newDoctorObj.password;

      return res.status(200).json({
        data: {
          doctor: newDoctorObj,
        },
        message: 'Registration Success!',
      });
    } else {
      let docObj = doctor.toObject();
      delete docObj.password;

      return res.status(200).json({
        data: {
          doctor: docObj,
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

module.exports.login = async (req, res) => {
  try {
    let doctor = await Doctor.findOne({ email: req.body.email });

    if (!doctor || doctor.password != req.body.password) {
      return res.status(422).json({
        message: 'Invalid username or password',
      });
    }

    return res.status(200).json({
      message: 'Sign in successful,here is your token,please keep it safe!',
      data: {
        token: jwt.sign(doctor.toJSON(), 'covid19', { expiresIn: '2300000' }),
      },
    });
  } catch (error) {
    console.log('***', err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
