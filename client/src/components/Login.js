//import dependencies
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";
import { backendURL } from "../sharedVariables";


const Login = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
      email: "",
      password: "",
    });
  
    const { email, password } = inputs;
  
    const onChange = (e) =>
      setInputs({ ...inputs, [e.target.name]: e.target.value });
  
    const onSubmitForm = async (e) => {
      e.preventDefault();
      try {
        // console.log('test')
        const body = { email, password };
        console.log(body);
        const response = await fetch(`${backendURL}auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const parseRes = await response.json();
        console.log(parseRes);
  
        if (parseRes.token) {
          // console.log(parseRes)
          // set token in localStorage
          localStorage.setItem("token", parseRes.token);
          setAuth(true);
          toast.success("Successfully logged in");
        } else {
          setAuth(false);
          toast.error(parseRes);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
  
    const demoUser = async () => {
      let body = {
        email: "bob@gmail.com",
        password: "bob",
      };
      const response = await fetch(`${backendURL}auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      console.log(parseRes);
  
      if (parseRes.token) {
        // set token in localStorage
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Successfully logged in");
      }
    };
  
    return (
      <Container className="my-5 w-50" 
      >
        <h1 className="text-center">Login</h1>
        {/* Login Form */}
        <form className="text-center mt-5 mb-3" onSubmit={onSubmitForm}>
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
          <button className="btn btn-success w-100">Sign In</button>
  
        </form>
        <div className="text-center">
          <button
            className="btn btn-warning w-100 mb-3"
            onClick={() => {
                demoUser();
              }}
          >
            Demo
          </button>
          <Link to="/register">Create Account</Link>
        </div>
      </Container>
    );
  };
  export default Login;
  