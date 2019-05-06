const { addValue } = require('./db');

/**
 * Exists only to accept a POST and push data into the table. Assumes that the table exists. Might
 * make this more sophisticated in the future and check but not ATM.
 *
 * @param {Express.Request} req - the request
 * @param {Express.Response} res - the response
 */
function handleDataPost(req, res) {
  const {
    data,
    hostname,
    name,
  } = req.body;
  addValue(`${name}-${hostname}`, data);
  res.send('OKIEDOKE');
}

module.exports = {
  handleDataPost
};
