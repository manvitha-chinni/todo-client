import jwtDecode from "jwt-decode";
import axios from 'axios';

const tokenKey = "token";

export async function login(response) {
    try {
        const url=process.env.REACT_APP_BACKEND_ROOT_URL+"/auth";
        const { data: jwt } = await axios.post(url, {
          tokenId: response.tokenId,
        });
        localStorage.setItem(tokenKey, jwt);
      } catch (e) {
        
        console.log("status:", e.response.status);
        console.log("error:", e.response.data);
      }
      finally
      {
        window.location = "/";
      }
}


export function logout() {
  localStorage.removeItem(tokenKey);
  window.location="/";
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function isUserLoggedIn()
{
    return (getJwt()!=null && getJwt()!=="")
}

export default {
  login,
  logout,
  getCurrentUser,
  getJwt
};
