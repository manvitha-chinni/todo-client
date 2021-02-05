import React from "react";
import GoogleLogin from "react-google-login";
import { login,getCurrentUser } from "../services/authService";

const failure=()=>{}

const Login = () => {
  return (
    <>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={login}
        onFailure={failure}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
};

export default Login;
