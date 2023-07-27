import React, { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";

const Login = () => {
  const emailRef = useRef();
  const passwordref = useRef();

  const [errors, setErrors] = useState(null);

  const { setUser, setToken } = useStateContext();

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("Login Page");

    const payload = {
      email: emailRef.current.value,
      password: passwordref.current.value,
    };

    console.log(payload);
    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        console.log("Login page user data ", data.user);
        setToken(data.token);
      })
      .catch((err) => {
        console.log("Signin page", err);
        const response = err.response;
        // console.log("error inside response", response);
        // console.log(err.response.status);
        if (response && response.status === 422) {
          console.log("Sig Component", response.data.errors);
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          {errors && <div className="alert"></div>}
          <h1 className="title">Login into your account</h1>
          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordref} type="password" placeholder="Password" />
          <button className="btn btn-block">Login</button>
          <p className="message">
            Not Registered? <Link to={"/signup"}>Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
