const moment = require('moment-timezone');

const modules = module.exports = {
	formatDate,
	durToSec,
};

// Reformat a date from 'MM/DD/YY hh:mm:ss A' to ISO
// Assumes date refers to 'PST'
function formatDate(timestamp) {
  const initZone = 'America/Los_Angeles';
  const endZone = 'America/New_York';

  const date = moment.tz(timestamp, 'MM/DD/YY hh:mm:ss A', initZone);
  if (date.isValid()) {
    return date.tz(endZone).toISOString();
  }
}

// Transform HH:MM:SS.MS duration format to number of seconds
function durToSec(dur) {
	return moment.duration(dur).asSeconds();
}
