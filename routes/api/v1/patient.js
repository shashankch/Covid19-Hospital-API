// import express
const express = require('express');

// import express router
const router = express.Router();

// import passport to add authentication middleware
const passport = require('passport');

// import patient controller api
const patientApi = require('../../../controllers/api/v1/patient_api');

// route to register patient by authenticated/authorized doctor(jwt)
router.post(
  '/register',
  passport.authenticate('jwt', { session: false }),
  patientApi.register,
);

// route to create patient's testing report by authorized/authenticated doctor(jwt)
router.post(
  '/:id/create_report',
  passport.authenticate('jwt', { session: false }),
  patientApi.createReport,
);

// route to get all reports of registerd patients.
router.get('/:id/all_reports', patientApi.allReports);

// export the router
module.exports = router;
