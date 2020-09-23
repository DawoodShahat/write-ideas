import React, { useState, useContext } from "react";
import Button from "./Button";
import Input from "./Input";
import fetchData from "../api/fetchData";
import { UserAuthContext } from "./UserAuthProvider";

import { useForm } from "react-hook-form";

const LoginControls = () => {
  const [credentials, setCredentials] = useState({ isValid: true, error: "" });

  const context = useContext(UserAuthContext);

  const { register, handleSubmit, errors } = useForm();

  const _loginSubmit = async (formData) => {
    console.log(formData);
    const { email, password } = formData;
    const data = await fetchData("api/users/login", {
      email: email,
      password: password,
    });
    console.log(data);

    // if your email or password is incorrect(doesn't exist in db)
    if (data.error) {
      setCredentials({ isValid: false, error: data.msg });
    }

    // if user isn't authenticated
    if (!data.redirectionSuccess) {
      context._isAuthenticated(false);
      return;
    }

    context._isAuthenticated(true);
  };

  return (
    <form>
      <ul className="nav-menu">
        <li className="nav-item">
          <Input
            type="email"
            name="email"
            label="Email"
            labelColor="white"
            ref={register({
              required: true,
              // email validation regExp pattern
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
          />
          {errors.email && (
            <p className="validation-msg" style={{ color: "red" }}>
              Provide a valid email address
            </p>
          )}
          {!credentials.isValid ? (
            <p className="validation-msg" style={{ color: "red" }}>
              {credentials.error}
            </p>
          ) : (
            ""
          )}
        </li>
        <li className="nav-item">
          <Input
            type="password"
            name="password"
            label="Password"
            labelColor="white"
            ref={register({
              required: true,
              minLength: 6,
            })}
          />
          {errors.password && (
            <p className="validation-msg" style={{ color: "red" }}>
              Password should be 6 character minimum
            </p>
          )}
          <div className="forgot-password">
            <p>forgot password</p>
            <a href="#">click here</a>
          </div>
        </li>
        <li className="nav-item">
          <Button
            name="log in"
            link="#"
            type="login"
            handleSubmit={handleSubmit(_loginSubmit)}
          />
        </li>
        <li className="nav-item">
          <Button name="sign up" link="/signup" type="signup" />
        </li>
      </ul>
    </form>
  );
};

export default LoginControls;
