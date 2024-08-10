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

export { isAuthorizedToCreateAccount };
