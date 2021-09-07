//import dependencies
import React, {useState, useEffect} from 'react'
import SearchArtist from "./components/SearchArtist";
import MyNavbar from "./components/MyNavbar";
import "bootstrap/dist/css/bootstrap.min.css";

import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

function App() {
  //jwt token
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
      <MyNavbar />
      <SearchArtist />
    </div>
  );
}

export default App;
