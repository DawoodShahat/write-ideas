import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import fetchData from "../api/fetchData";
import validate from "./validate";
import { withRouter } from "react-router-dom";

import { useForm } from "react-hook-form";

const Form = ({ history, handleLoadingData, handleErrors }) => {
  const { watch, register, errors, handleSubmit } = useForm();

  const _submit = async (formData) => {
    // remove the errors for the previous try
    handleErrors([]);

    console.table(formData);

    const { firstname, lastname, email, password } = formData;

    const url = "api/users/register";

    handleLoadingData(true);
    const data = await fetchData(url, {
      name: `${firstname} ${lastname}`,
      email: email,
      password: password,
      confirmPassword: password,
    });

    // hide the loading indicator
    handleLoadingData(false);

    // update the state if there are any errors
    if (data.errors) {
      handleErrors(data.errors);
    } else {
      history.push("/login");
    }
  };

  return (
    <form id="form" method="post">
      <Input
        type="text"
        name="firstname"
        label="First Name"
        labelColor="black"
        content="column"
        ref={register({ required: true })}
      />
      <Input
        type="text"
        name="lastname"
        label="Last Name"
        labelColor="black"
        content="column"
        ref={register({ required: true })}
      />
      {errors.email && (
        <p style={{ color: "red" }}>Provide a valid email address</p>
      )}
      <Input
        type="email"
        name="email"
        label="Email"
        labelColor="black"
        content="column"
        ref={register({
          required: true,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        })}
      />
      {errors.password?.type === "minLength" && (
        <p style={{ color: "red" }}>Password should be 6 character minimum</p>
      )}
      {errors.confirm_password?.type === "validate" && (
        <p style={{ color: "red" }}>Both passwords should match</p>
      )}

      <Input
        type="password"
        name="password"
        label="Password"
        labelColor="black"
        content="column"
        ref={register({
          required: true,
          minLength: 6,
        })}
      />
      <Input
        type="password"
        name="confirm_password"
        label="Confirm Password"
        labelColor="black"
        content="column"
        ref={register({
          required: true,
          minLength: 6,
          validate: (value) => watch("password") === value,
        })}
      />
      <Button
        handleSubmit={handleSubmit(_submit)}
        name="sign up"
        link="#"
        type="signup"
      />
    </form>
  );
};

export default withRouter(Form);
