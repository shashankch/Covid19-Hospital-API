// import express
const express = require('express');

// import express router
const router = express.Router();

// import doctor,patient and report routes
const doctors = require('./doctor');
const patients = require('./patient');
const reports = require('./report');

// including routes for doctor,patient and report
router.use('/doctors', doctors);
router.use('/patients', patients);
router.use('/reports', reports);

// export the router
module.exports = router;
