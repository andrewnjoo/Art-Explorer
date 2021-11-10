// import dependencies
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";
import { backendURL } from "../sharedVariables";

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
      console.log(parseRes);

      if (parseRes.token) {
        console.log("testing123");
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
    <Container
    //Register Form
    className="my-5 py-5 registerloginbox"
      
    >
      <h3 className="text-center my-4">Sign Up</h3>
      <form className="mb-3" onSubmit={onSubmitForm}>
        <h5>Username</h5>
        <input
          type="text"
          name="name"
          placeholder="Username"
          className="form-control my-3"
          value={name}
          onChange={(e) => onChange(e)}
        ></input>
        <h5>Email</h5>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control my-3"
          value={email}
          onChange={(e) => onChange(e)}
          ></input>
          <h5>Password</h5>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control my-3"
          value={password}
          onChange={(e) => onChange(e)}
        ></input>
        <button className="btn btn-success w-100">Sign up</button>
      </form>
      <div className="text-center">
        <Link to="/login" style={{ textDecoration: "none" }}>
          Login
        </Link>
      </div>
    </Container>
  );
};

export default Register;
