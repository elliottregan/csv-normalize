const datetimeSvc = require('./datetimeSvc')

const modules = module.exports = {
	processHeader,
	processDataRow,
};

function processHeader(columns) {
	columns = _rowDataToArray(columns);

	columns[4] = columns[4] + '(s)';
	columns[5] = columns[5] + '(s)';
	columns[6] = columns[6] + '(s)';

  // Convert Array back to String, and return
  return columns.toString();
}

function processDataRow(columns) {

		// Convert String to Array to process each column separately
		columns = _rowDataToArray(columns);

		// Format date into ISOString
    columns[0] = datetimeSvc.formatDate(columns[0]);

    // Normalize ZIP codes to 5 digits, prefixing with '0' if less than 5 digits given.
    columns[2] = ("00000" + columns[2]).slice(-5);

    // Transform all Names to Uppercase characters
    columns[3] = columns[3].toLocaleUpperCase();

    // Transform HH:MM:SS.MS format to number of seconds
    columns[4] = datetimeSvc.durToSec(columns[4]);
    columns[5] = datetimeSvc.durToSec(columns[5]);

    // Add columns 4 and 5 together. Cut sigfigs to 3 to match incoming data
    columns[6] = (columns[5] + columns[4]).toFixed(3);

    // Convert Array back to String, and return
    return columns.toString();
}

// split String into Array, using comma as delimeter.
/* Regex Description:
(
    ".*?"       double quotes + anything but double quotes + double quotes
    [^",\s]+    1 or more characters excl. double quotes, comma or spaces of any kind
)
(?=             Followed by...
    \s*,        0 or more empty spaces and a comma
    \s*$        0 or more empty spaces and nothing else
)
*/
function _rowDataToArray(rowData) {
  return rowData.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g)
}

