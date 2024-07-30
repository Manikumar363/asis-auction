import { LogOut } from "./Logout";

export const parseError = (error) => {
  if (error.response) {
    if (error.response.status === 401) {
      LogOut();
      return "Your session has expired. Please log in again.";
    } else if (error.response.data && error.response.data.message) {
      return error.response.data.message;
    } else {
      return "An error occurred while processing your request.";
    }
  } else if (error.request) {
    return "No response from the server. Please try again later.";
  } else {
    return "An error occurred. Please try again later.";
  }
};
