// import report model
const Report = require('../../../models/report');

// controller action to return filtered report by testing status
module.exports.filterReports = async (req, res) => {
  try {
    // checking if status sent in req is valid from the standard result status
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

      // sending invalid response message on invalid status
      return res.status(422).json({
        message: 'Invalid Input',
      });
    }

    // finding all report by the requested status from latest to oldest
    // removed sensitive info like password in the result response
    let reports = await Report.find({ status: status })
      .sort('-createdAt')
      .populate('doctor', 'name email')
      .populate('patient');

    // sending success response
    return res.status(200).json({
      message: 'list of reports by status',
      reports: reports,
    });
  } catch (error) {
    // error response on req. failure.
    console.log('***', err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
