//import dependencies
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";
import { backendURL } from "../sharedVariables";

// login function
const Login = ({ setAuth, getUserName }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  // onsubmit function
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      // console.log(body);
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
        getUserName();
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  //demo login
  const demoUser = async () => {
    let body = {
      email: "demo@demo.com",
      password: "demo",
    };
    const response = await fetch(`${backendURL}auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const parseRes = await response.json();
    console.log("parseres is ", parseRes);

    if (parseRes.token) {
      // set token in localStorage
      localStorage.setItem("token", parseRes.token);
      setAuth(true);
      toast.success("Successfully logged in");
      getUserName();
    }
  };

  return (
    // Login form
    <Container
      className="my-5 registerloginbox"
    >
      <h1 className="text-center">Login</h1>

      <form className=" mt-5 mb-3" onSubmit={onSubmitForm}>
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
        <button className="btn btn-success w-100">Login</button>
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
        <span>Don't have an account?</span>
        <Link to="/register" style={{ textDecoration: "none" }}>
          {" "}
          Sign Up
        </Link>
      </div>
    </Container>
  );
};
export default Login;
