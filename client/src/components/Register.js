// import dependencies
import React, { useState } from "react";
import {Link} from 'react-router-dom'
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";
import { backendURL } from "../sharedVariables";
import {ThreeFiber} from "./ThreeFiber";

//main function
const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { email, password, name } = inputs;
  //controlled onChange function
  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  //onSubmitForm
  const onSubmitForm = async (e) => {
    //prevent refresh of page
    e.preventDefault();
    try {
      const body = { name, email, password };
      const response = await fetch(`${backendURL}auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      console.log(parseRes)

      if (parseRes.token) {
        console.log('testing123')
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Registered successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Container className="w-50">
      <ThreeFiber/>
      <h1 className="text-center my-5">Register</h1>
      {/* Register Form */}
      <form className="mb-3" onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control my-3"
          value={email}
          onChange={(e) => onChange(e)}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control my-3"
          value={password}
          onChange={(e) => onChange(e)}
        ></input>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="form-control my-3"
          value={name}
          onChange={(e) => onChange(e)}
        ></input>
        <button className="btn btn-success w-100">Sign up</button>
      </form>
      <div className="text-center mb-5">
        <Link to="/login">Login</Link>
      </div>
    </Container>
  );
};

export default Register;
