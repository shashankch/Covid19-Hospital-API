// import express
const express = require('express');

// import express router
const router = express.Router();

// import report conttoller api
const reportApi = require('../../../controllers/api/v1/report_api');

// route to get all report by given status
router.get('/:status', reportApi.filterReports);

// export the router
module.exports = router;
