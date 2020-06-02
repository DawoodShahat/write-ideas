import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import fetchData from "../api/fetchData";
import validate from "./validate";
import { withRouter } from "react-router-dom";

const Form = ({ history, handleLoadingData, handleErrors }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLasttname] = useState("");
  const [email, setEmail] = useState({ value: "", isEmailValid: false });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    passwordConfirmCheck: false,
    isPasswordValid: false,
  });

  const [showValidationMsg, setshowValidationMsg] = useState(false);

  const _firstname = (e) => setFirstname(e.target.value);
  const _lastname = (e) => setLasttname(e.target.value);

  const _email = (e) => {
    const inputVal = e.target.value;
    setEmail({
      value: inputVal,
      isEmailValid: validate.emailIsValid(inputVal),
    });
  };

  const _password = (e) => {
    const inputVal = e.target.value;
    setPassword(e.target.value);

    setConfirmPassword({
      ...confirmPassword,
      passwordConfirmCheck: validate.passwordConfirmCheck(
        inputVal,
        confirmPassword.value
      ),
      isPasswordValid: validate.isPasswordValid(inputVal),
    });
  };

  const _confirmPassword = (e) => {
    const inputVal = e.target.value;
    setConfirmPassword({
      value: inputVal,
      passwordConfirmCheck: validate.passwordConfirmCheck(password, inputVal),
      isPasswordValid: validate.isPasswordValid(password),
    });
  };

  const _submit = async (e) => {
    // show the indicator
    setshowValidationMsg(true);

    // remove the errors for the previous try
    handleErrors([]);

    if (
      !confirmPassword.passwordConfirmCheck ||
      !email.isEmailValid ||
      !confirmPassword.isPasswordValid
    ) {
      return;
    }

    const url = "api/users/register";

    handleLoadingData(true);
    const data = await fetchData(url, {
      name: `${firstname} ${lastname}`,
      email: email.value,
      password,
      confirmPassword: confirmPassword.value,
    });

    // hide the loading indicator
    handleLoadingData(false);

    // update the state if there are any errors
    if (data.errors) {
      handleErrors(data.errors);
    } else {
      history.push("/login");
    }

    console.log(data);
  };

  return (
    <form id="form" method="post">
      <Input
        handleInput={_firstname}
        type="text"
        label="First Name"
        labelColor="black"
        content="column"
      />
      <Input
        handleInput={_lastname}
        type="text"
        label="Last Name"
        labelColor="black"
        content="column"
      />
      {!email.isEmailValid && showValidationMsg ? (
        <p style={{ color: "red" }}>Provide a valid email address</p>
      ) : (
        ""
      )}
      <Input
        handleInput={_email}
        type="email"
        label="Email"
        labelColor="black"
        content="column"
      />
      {!confirmPassword.passwordConfirmCheck && showValidationMsg ? (
        <p style={{ color: "red" }}>Both passwords should match</p>
      ) : (
        ""
      )}
      {!confirmPassword.isPasswordValid && showValidationMsg ? (
        <p style={{ color: "red" }}>Password should be 6 character minimum</p>
      ) : (
        ""
      )}
      <Input
        handleInput={_password}
        type="password"
        label="Password"
        labelColor="black"
        content="column"
      />
      <Input
        handleInput={_confirmPassword}
        type="password"
        label="Confirm Password"
        labelColor="black"
        content="column"
      />
      <Button handleSubmit={_submit} name="sign up" link="#" type="signup" />
    </form>
  );
};

export default withRouter(Form);
