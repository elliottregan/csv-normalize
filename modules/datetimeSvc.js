const moment = require('moment-timezone');

const modules = module.exports = {
  formatDate,
  durToSec,
  addSeconds,
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
  else {
    return {
      error: 'INVALID DATE: ' + timestamp
    }
  }
}

// Transform HH:MM:SS.MS duration format to number of seconds
/* Regex Description:
    ^[1-9][0-9]*$       any number larger than 0
    [0-5][0-9]          any number less than 59 and greater than 0
*/
function durToSec(dur) {
  // Log error if 
  if (/(^[1-9][0-9]*$):[0-5][0-9]:[0-5][0-9]/g.test(dur)) {
    return {
      error: 'INVALID DURATION: ' + dur
    }
  }
  else {
    return moment.duration(dur).asSeconds();
  }
}

function addSeconds(sec1, sec2) {
  if (!_isNumber(sec1)) {
    return {
      error: `INVALID DURATION: #{sec1}`
    }
  } else if (!_isNumber(sec2)) {
    return {
      error: `INVALID DURATION: #{sec2}`
    }
  } else {
    console.error(sec1, sec2)
    return (sec1 + sec2).toFixed(3);
  }
}

function _isNumber(num) {
  return Number(parseFloat(num)) === num;
}