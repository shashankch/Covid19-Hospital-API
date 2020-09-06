const Report = require('../../../models/report');
const jwt = require('jsonwebtoken');

module.exports.filterReports = async (req, res) => {
  try {
    let status = req.params.status;
    if (
      [
        'Negative',
        'Travelled-Quarantine',
        'Symptoms-Quarantine',
        'Positive-Admit',
      ].includes(status.toString()) == false
    ) {
      console.log('going inside ###########');
      return res.status(422).json({
        message: 'Invalid Input',
      });
    }
    let reports = await Report.find({ status: status })
      .sort('-createdAt')
      .populate('doctor', 'name email')
      .populate('patient');

    return res.status(200).json({
      message: 'list of reports by status',
      reports: reports,
    });
  } catch (error) {
    console.log('***', err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
