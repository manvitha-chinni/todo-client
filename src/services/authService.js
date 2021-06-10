import jwtDecode from "jwt-decode";
import http from "./httpService";

const {installServiceWorker} = window.helperFunctions
const tokenKey = "token";
const rootUrl =  process.env.REACT_APP_BACKEND_ROOT_URL;
http.setJwt(getJwt());

async function addSubscription(subscription){
  console.log('going to subscribe');
  const url = rootUrl+"/subscribe";
  await http.post(url,{subscription});
}

export async function login(response) {
    try {
        const url=rootUrl+"/auth";
        const { data: jwt } = await http.post(url, {
          tokenId: response.tokenId,
        });
        localStorage.setItem(tokenKey, jwt);
        http.setJwt(getJwt());
        await installServiceWorker(addSubscription);
        console.log('installed');
        debugger;
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
