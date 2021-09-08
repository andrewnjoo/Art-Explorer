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
import { backendURL } from "./sharedVariables";

//import components
import SearchArtist from "./components/SearchArtist";
import MyNavbar from "./components/MyNavbar";
import Register from "./components/Register"

// configure toastify
toast.configure({
  position: "bottom-right",
  autoClose: 3000,
  draggable: true,
  pauseOnHover: false,
});

function App() {
  //isAuthenticated
  const [isAuthenticated, setisAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setisAuthenticated(boolean);
  };

  //pass jwt token to middleware in backend to check if authorized
  async function isAuth() {
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
  }

  // check if authenticated
  useEffect(() => {
    isAuth();
  }, []);

  return (
    <div className="App">
      <MyNavbar isAuth={isAuthenticated} setAuth={setAuth} />
      <Router>
        <Switch>
          <Route
          exact
          path='/'
          render={(props)=><SearchArtist/>}
          />
          <Route
            exact
            path="/register"
            render={(props) =>
              !isAuthenticated ? <Register /> : <Redirect to="/" />
            }
          />
        </Switch>
      </Router>
      {/* <SearchArtist /> */}
    </div>
  );
}

export default App;
