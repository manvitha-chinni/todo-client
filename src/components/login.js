import React from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { loginUser, getLoggedInUserDetails } from "../utils/auth";

const responseGoogle = async (response) => {
  // console.log(response.tokenId);
  // console.log(process.env.ROOT_URL + "/auth");
  try {
    const { data: jwt } = await axios.post("http://localhost:5000/auth", {
      tokenId: response.tokenId,
    });
    loginUser(jwt);
    // getLoggedInUserDetails();
  } catch (e) {
    console.log("status:", e.response.status);
    console.log("error:", e.response.data);
  }
};

const Login = () => {
  return (
    <>
      <GoogleLogin
        clientId={process.env.GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
};

export default Login;
