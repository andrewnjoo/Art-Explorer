//import dependencies
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";
import { backendURL } from "../sharedVariables";
import SampleArtist from "./SampleArtist";

// login function
const Login = ({ setAuth, setuserName }) => {
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
          getUserName()
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
      console.log('parseres is ', parseRes);
  
      if (parseRes.token) {
        // set token in localStorage
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Successfully logged in");
        getUserName()
      }
    };

    //get username
    async function getUserName() {
      try {
        const response = await fetch(`${backendURL}dashboard/`, {
          method: "GET",
          headers: { token: localStorage.token },
        });
        const parseRes = await response.json();
        console.log('parseRes', parseRes);
        //set name
        setuserName(parseRes.user_name)
      } catch (err) {
        console.error(err.message);
      }
    }
  
    return (
      <Container className="my-5 w-50" 
      >
        <SampleArtist />
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
  