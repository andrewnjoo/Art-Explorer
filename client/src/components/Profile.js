import React, { useState, useEffect } from "react";
import { backendURL } from "../sharedVariables";
import axios from "axios";
import { Container } from "react-bootstrap";


// profile function
const Profile = ({checkupdate}) => {

//get artists
const GetArtists = () => {
  let [artists, setArtists] = useState([]);
  useEffect(() => {
    getFav();
  }, [checkupdate]);
  const mapArtists = () => {
    return artists.map((x) => {
      return (
        <div>
          <div style={{ display: "inline-block" }}>{x.name}</div>
          {/* <button>del</button>  */}
        </div>
      );
    });
  };
  const getFav = () => {
    //set headers
    const headers = {
      "Content-Type": "application/json",
      token: localStorage.token,
    };
    console.log("test");
    //make axios call
    axios
      .get(`${backendURL}api/getartists`, {
        "headers": headers,
      })
      .then((res) => {
        setArtists(res.data.rows);
      });
  };
  return (
    <div>
      My favorite artists:
      {mapArtists()}
    </div>
  );
};

  const [name, setName] = useState("");

  async function getName() {
    try {
      const response = await fetch(`${backendURL}dashboard/`, {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();

      console.log(parseRes);
      //set name
      setName(parseRes.user_name);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getName();
  });
  return (
    <Container>
      Welcome, {name}!
      <br/>
      <br/>
      <GetArtists/>
      <div style={{display:'none'}}>{checkupdate}</div>
    </Container>
  );
};

export default Profile;
