const isAuthorizedToCreateAccount = (userRole, loggedInUserRole) => {
  if (userRole === "Student") {
    if (!(loggedInUserRole === "Principal" || loggedInUserRole === "Teacher")) {
      return false;
    }
  }
  if (userRole === "Teacher") {
    if (loggedInUserRole !== "Principal") {
      return false;
    }
  }

  return true;
};

function isValidTimeFormat(time) {
  // Split the time string by colon
  const parts = time.split(':');

  // Check if there are exactly two parts (hours and minutes)
  if (parts.length !== 2) return false;

  const hours = parts[0];
  const minutes = parts[1];

  // Convert hours and minutes to integers
  const hoursInt = parseInt(hours, 10);
  const minutesInt = parseInt(minutes, 10);

  // Check if hours and minutes are valid numbers
  if (isNaN(hoursInt) || isNaN(minutesInt)) return false;

  // Validate the range of hours (00-23) and minutes (00-59)
  if (hoursInt < 0 || hoursInt > 23 || minutesInt < 0 || minutesInt > 59) {
    return false;
  }

  // Check if hours and minutes are two digits (e.g., 08 instead of 8)
  if (hours.length !== 2 || minutes.length !== 2) {
    return false;
  }

  return true;
}

export { isAuthorizedToCreateAccount, isValidTimeFormat };
