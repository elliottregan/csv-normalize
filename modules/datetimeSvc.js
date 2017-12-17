// TODO: remove dependancy in favor of only required functions.
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
    ^[0-9]+        any number larger than 0
    [:]                 followed by :
    [0-5][0-9]          any number less than 59 and greater than 0
    [:]                 followed by :
    [0-5][0-9]          any number less than 59 and greater than 0
    (                   optionally followed by...
    [.]                 .
    [0-9]+              any number larger than 0
    )
*/
function durToSec(dur) {
  if (/^[0-9]+[:][0-5][0-9][:][0-5][0-9]([.][0-9]+)*$/.test(dur)) {
    return moment.duration(dur).asSeconds();
  }
  else {
    return {
      error: 'INVALID DURATION: ' + dur
    }
  }
}

// Adds two numbers together
// Return error if either argument is not a number.
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
    return (sec1 + sec2).toFixed(3);
  }
}

// Check if argument is a number.
function _isNumber(num) {
  return Number(parseFloat(num)) === num;
}