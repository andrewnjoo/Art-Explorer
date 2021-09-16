//import dependencies
import React, { useState, useEffect } from "react";
import {
  //browserrouter or hashrouter
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
import MyNavBar from "./components/MyNavBar";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Artworks from "./components/Artworks";
import Artists from "./components/Artists";
import Profile from "./components/Profile";

// configure toastify
toast.configure({
  position: "bottom-right",
  autoClose: 3000,
  draggable: true,
  pauseOnHover: false,
});

//main app
const App = () => {
  //isAuthenticated
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [updated, setUpdated] = useState("");
  const [profileArtistName, setprofileArtistName] = useState("");

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
      // console.log('isAuth?',isAuthenticated)
    } catch (err) {
      console.error(err.message);
    }
  };

  // check if authenticated
  useEffect(() => {
    isAuth();
  }, []);

  //check if data is updated
  useEffect(() => {
    console.log("updated is", updated);
  }, [updated]);

  //check if profileartistname updated
  useEffect(() => {
    console.log("profileartistname is", profileArtistName);
  }, [profileArtistName]);

  return (
    <div className="App">
      <MyNavBar isAuth={isAuthenticated} setAuth={setisAuthenticated} />
      <Router>
        <Switch>
          {/* Homepage */}
          <Route
            exact
            path="/"
            render={() => (
              <>
                <Dashboard
                  isAuthenticated={isAuthenticated}
                  updated={updated}
                  setprofileArtistName={setprofileArtistName}
                />
                <SearchArtist
                  updated={updated}
                  passChildData={setUpdated}
                  profileArtistName={profileArtistName}
                />
              </>
            )}
          />
          {/* Login Route */}
          <Route
            exact
            path="/login"
            render={(props) =>
              !isAuthenticated ? (
                <Login {...props} setAuth={setisAuthenticated} />
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
                <Register setAuth={setisAuthenticated} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          {/* art route */}
          <Route
            exact
            path="/art"
            render={(props) => <Artworks />}
          />
          {/* artists route */}
          <Route exact path="/artists" render={(props) => <Artists />} />
          {/* profile route */}
          <Route
            exact
            path="/profile"
            render={(props) =>
              !isAuthenticated ? ( //false? go to
                // <Redirect to="/" />
                <h4>404 page unavailable</h4>
              ) : (
                <Profile />
              )
            }
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
