import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../Context/ContextProvider";
import axiosClient from "../axios-client";

const Signup = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const [errors, setErrors] = useState(null);

  const { setUser, setToken } = useStateContext();
  const onSubmit = (event) => {
    event.preventDefault();
    console.log("hello world");
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };
    // console.log(payload);

    axiosClient
      .post("/signup", payload)
      .then(({ data }) => {
        setUser(data.user);

        console.log("response", data.user);
        setToken(data.token);
      })
      .catch((err) => {
        console.log("Signup Component", err);
        const response = err.response;
        // console.log("error inside response", response);
        // console.log(err.response.status);
        if (response && response.status === 422) {
          console.log("Signup Component", response.data.errors);
          setErrors(response.data.errors);
        }
      });

    console.log("data ", errors);
    console.log(
      Object.keys(errors).map((key) => {
        console.log("Iteration ", errors[key][0]);
      })
    );
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Signup for free</h1>
          {errors && (
            <div className="alert">
              {errors.name} <br />
              {errors.email} <br />
              {errors.password} <br />
              {errors.password_confirmation} <br />
            </div>
          )}
          {/* {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => {
                <p key={key}>{errors[key][0]}</p>;
              })}
            </div>
          )} */}
          {/* {errors && <div>{Object.keys(errors)}</div>} */}
          <input ref={nameRef} type="text" placeholder="Full Name" />
          <input ref={emailRef} type="email" placeholder="Email Address" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <input
            ref={passwordConfirmationRef}
            type="password"
            placeholder="Password Confirmation"
          />
          <button className="btn btn-block">Signup</button>
          <p className="message">
            Already Registered? <Link to={"/login"}>Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
