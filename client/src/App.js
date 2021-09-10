//import dependencies
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { backendURL } from "./sharedVariables";

//import components
import SearchArtist from "./components/SearchArtist";
import MyNavbar from "./components/MyNavbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { SampleArtist } from "./components/SampleArtist";

// configure toastify
toast.configure({
  position: "bottom-right",
  autoClose: 3000,
  draggable: true,
  pauseOnHover: false,
});

const App = () => {
  //isAuthenticated
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [updated, setUpdated] = useState("");

  const setAuth = (boolean) => {
    setisAuthenticated(boolean);
  };

  //pass jwt token to middleware in backend to check if authorized
  const isAuth = async () => {
    try {
      const response = await fetch(`${backendURL}auth/is-verify`, {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      // console.log('parseres', parseRes)

      parseRes === true ? setisAuthenticated(true) : setisAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  // check if authenticated
  useEffect(() => {
    isAuth();
  }, []);

  useEffect(() => {
    console.log("updated is", updated);
  }, [updated]);

  return (
    <div className="App">
      <MyNavbar isAuth={isAuthenticated} setAuth={setAuth} />
      <Router>
        <Switch>
          {/* Homepage */}
          <Route
            exact
            path="/"
            render={(props) =>
              !isAuthenticated ? (
                <>
                <SampleArtist/> 
                <Login {...props} setAuth={setAuth} />
                </>
                ) : (
                  <>
                  <Profile checkupdate={updated} />
                  <SearchArtist updated={updated} passChildData={setUpdated} />
                  </>
              )
            }
          />
          {/* Login Route */}
          <Route
            exact
            path="/login"
            render={(props) =>
              !isAuthenticated ? (
                <Login {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          {/* Register Route */}
          <Route
            exact
            path="/register"
            render={(props) =>
              !isAuthenticated ? (
                <Register setAuth={setAuth} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
