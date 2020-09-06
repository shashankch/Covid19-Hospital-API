const express = require('express');

const router = express.Router();

const doctors = require('./doctor');
const patients = require('./patient');
const reports = require('./report');

router.use('/doctors', doctors);
router.use('/patients', patients);
router.use('/reports', reports);
module.exports = router;
