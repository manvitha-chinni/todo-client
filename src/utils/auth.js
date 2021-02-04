import jwtDecode from "jwt-decode";
const user = "userId";

export const isUserLoggedIn = () => {
  return localStorage.getItem(user) ? true : false;
};

export const logoutUser = () => {
  localStorage.removeItem(user);
  window.location = "/";
};

export const loginUser = (jwt) => {
  localStorage.setItem(user, jwt);
  window.location = "/";
};
export const getLoggedInUserDetails = () => {
  const jwt = localStorage.getItem(user);
  const data = jwtDecode(jwt);
  console.log(data);
};

export default {
  isUserLoggedIn,
  logoutUser,
  loginUser,
  getLoggedInUserDetails,
};
