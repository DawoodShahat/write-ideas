import React, { useState, useContext } from "react";
import Button from "./Button";
import Input from "./Input";
import fetchData from "../api/fetchData";
import validate from "./validate";
import { UserAuthContext } from "./UserAuthProvider";

const LoginControls = () => {
  const [email, setEmail] = useState({ value: "", isEmailValid: false });
  const [password, setPassword] = useState({
    value: "",
    isPasswordValid: false,
  });
  const [showValidationMsg, setshowValidationMsg] = useState(false);
  const [credentials, setCredentials] = useState({ isValid: true, error: "" });

  const context = useContext(UserAuthContext);

  const _email = (e) => {
    const inputVal = e.target.value;
    setEmail({
      value: inputVal,
      isEmailValid: validate.emailIsValid(inputVal),
    });
  };

  const _password = (e) => {
    const inputVal = e.target.value;
    setPassword({
      value: inputVal,
      isPasswordValid: validate.isPasswordValid(inputVal),
    });
  };

  const _loginSubmit = async (e) => {
    setshowValidationMsg(true);

    // if email or password is not valid syntactically
    if (!email.isEmailValid || !password.isPasswordValid) {
      return;
    }

    const data = await fetchData("api/users/login", {
      email: email.value,
      password: password.value,
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
    <ul className="nav-menu">
      <li className="nav-item">
        <Input
          type="email"
          label="Email"
          labelColor="white"
          handleInput={_email}
        />
        {!email.isEmailValid && showValidationMsg ? (
          <p className="validation-msg" style={{ color: "red" }}>
            Provide a valid email address
          </p>
        ) : (
          ""
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
          handleInput={_password}
          type="password"
          label="Password"
          labelColor="white"
        />
        {!password.isPasswordValid && showValidationMsg ? (
          <p className="validation-msg" style={{ color: "red" }}>
            Password should be 6 character minimum
          </p>
        ) : (
          ""
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
          handleSubmit={_loginSubmit}
        />
      </li>
      <li className="nav-item">
        <Button name="sign up" link="/signup" type="signup" />
      </li>
    </ul>
  );
};

export default LoginControls;
