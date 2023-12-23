const addDateSuffix = (date) => {
  let dateStr = date.toString();

  // get last char of date string
  const lastChar = dateStr.charAt(dateStr.length - 1);

  if (lastChar === '1' && dateStr !== '11') {
    dateStr = `${dateStr}st`;
  } else if (lastChar === '2' && dateStr !== '12') {
    dateStr = `${dateStr}nd`;
  } else if (lastChar === '3' && dateStr !== '13') {
    dateStr = `${dateStr}rd`;
  } else {
    dateStr = `${dateStr}th`;
  }

  return dateStr;
};

// Function to format a timestamp, accepts the timestamp and an `options` object as optional parameters
const formatDate = (timestamp, { monthLength = 'short', dateSuffix = true } = {}) => {
  // Create a date object from the timestamp
  const dateObj = new Date(timestamp);

  // Validate the date object
  if (isNaN(dateObj.getTime())) {
    return 'Invalid date';
  }

  // Create month object
  const months = {
    0: monthLength === 'short' ? 'Jan' : 'January',
    1: monthLength === 'short' ? 'Feb' : 'February',
    2: monthLength === 'short' ? 'Mar' : 'March',
    3: monthLength === 'short' ? 'Apr' : 'April',
    4: monthLength === 'short' ? 'May' : 'May',
    5: monthLength === 'short' ? 'Jun' : 'June',
    6: monthLength === 'short' ? 'Jul' : 'July',
    7: monthLength === 'short' ? 'Aug' : 'August',
    8: monthLength === 'short' ? 'Sep' : 'September',
    9: monthLength === 'short' ? 'Oct' : 'October',
    10: monthLength === 'short' ? 'Nov' : 'November',
    11: monthLength === 'short' ? 'Dec' : 'December',
  };

  // Extract components of the date
  const formattedMonth = months[dateObj.getMonth()];
  const dayOfMonth = dateSuffix ? addDateSuffix(dateObj.getDate()) : dateObj.getDate();
  const year = dateObj.getFullYear();

  // Format the hour
  let hour = dateObj.getHours() % 12 || 12; // converts 0 to 12 for midnight
  const minutes = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();
  const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am';

  // Construct the formatted timestamp
  const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;

  return formattedTimeStamp;
};

module.exports = formatDate;
