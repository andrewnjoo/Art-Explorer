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
import axios from "axios";
import "./index.css"

//import components
import SearchArtist from "./components/SearchArtist";
import MyNavBar from "./components/MyNavBar";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import TabArtworks from "./components/TabArtworks";
import TabLearnAbout from "./components/TabLearnAbout";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import { TabPopularArtists } from "./components/TabPopularArtists";

// configure toastify
toast.configure({
  position: "bottom-right",
  autoClose: 3000,
  draggable: true,
  pauseOnHover: false,
});

//main app
const App = () => {
  const [artists, setArtists] = useState([]);
  const [isAuthenticated, setisAuthenticated] = useState(false); //isAuthenticated
  const [profileArtistName, setprofileArtistName] = useState("");
  const [userName, setuserName] = useState("");

  //get username
  async function getUserName() {
    try {
      const response = await fetch(`${backendURL}dashboard/`, {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();
      console.log("parseRes", parseRes);
      //set name
      setuserName(parseRes.user_name);
    } catch (err) {
      console.error(err.message);
    }
  }

  const getFav = () => {
    const headers = {
      "Content-Type": "application/json",
      token: localStorage.token,
    };
    axios
      .get(`${backendURL}api/getartists`, {
        headers,
      })
      .then((res) => {
        setArtists(res.data.rows);
      });
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
      // console.log('isAuth?',isAuthenticated)
    } catch (err) {
      console.error(err.message);
    }
  };

  // check if authenticated
  useEffect(() => {
    isAuth();
  }, []);

  return (
    <div className="App">
      <MyNavBar
        isAuth={isAuthenticated}
        setAuth={setisAuthenticated}
        userName={userName}
        getUserName={getUserName}
      />
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
                  setprofileArtistName={setprofileArtistName}
                  artists={artists}
                  setArtists={setArtists}
                  getFav={getFav}
                />
                <SearchArtist
                  profileArtistName={profileArtistName}
                  isAuthenticated={isAuthenticated}
                  artists={artists}
                  getFav={getFav}
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
                <Login
                  {...props}
                  setAuth={setisAuthenticated}
                  setuserName={setuserName}
                  getUserName={getUserName}
                />
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
          <Route exact path="/artworks" render={(props) => <TabArtworks />} />
          {/* art movements */}
          <Route
            exact
            path="/artmovements"
            render={(props) => <TabLearnAbout />}
          />
          {/* popular artists route */}
          <Route
            exact
            path="/popularartists"
            render={(props) => <TabPopularArtists />}
          />
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
      <Footer />
    </div>
  );
};

export default App;
