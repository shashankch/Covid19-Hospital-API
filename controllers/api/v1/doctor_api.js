// import doctor model
const Doctor = require('../../../models/doctor');

// import jsonweb token module to create token
const jwt = require('jsonwebtoken');

// controller action to register doctor by name,email and password and sending success result
module.exports.register = async (req, res) => {
  try {
    // find if already present in db
    let doctor = await Doctor.findOne({ email: req.body.email });

    // if new registration then storing doctor info
    if (!doctor) {
      let newDoctor = await Doctor.create(req.body);

      // removing sensitive info like password from newly created doctor object
      let newDoctorObj = newDoctor.toObject();
      delete newDoctorObj.password;

      // sending the success response message along with registered doctor info.
      return res.status(200).json({
        data: {
          doctor: newDoctorObj,
        },
        message: 'Registration Success!',
      });
    } else {
      let docObj = doctor.toObject();
      delete docObj.password;

      // if present then sending that registered  doctor info
      return res.status(200).json({
        data: {
          doctor: docObj,
        },
        message: 'Already registered with us!',
      });
    }
  } catch (error) {
    // return error response on request failure
    console.log('***', err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

// controller action to login registered doctors using email and password
module.exports.login = async (req, res) => {
  try {
    // find if present in db
    let doctor = await Doctor.findOne({ email: req.body.email });

    // check if doctor does not exists or invalid credentials and sending appropriate response
    if (!doctor || doctor.password != req.body.password) {
      return res.status(422).json({
        message: 'Invalid username or password',
      });
    }

    // return success response with jwt token created from doctor's info.
    return res.status(200).json({
      message: 'Sign in successful,here is your token,please keep it safe!',
      data: {
        token: jwt.sign(doctor.toJSON(), 'covid19', { expiresIn: '2300000' }),
      },
    });
  } catch (error) {
    // return error response on request failure
    console.log('***', err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
