import { useState, useEffect } from "react";
import { backendURL } from "../sharedVariables";
import axios from "axios";
import { Container, Card } from "react-bootstrap";

// profile function
const Dashboard = ({ updated, setprofileArtistName, isAuthenticated }) => {
  //get artists
  const GetArtists = () => {
    let [artists, setArtists] = useState([]);

    //if new artist added, get new favorites from db
    useEffect(() => {
      getFav();
    }, []); 

    //send from profile to app to searchartist
    const changeName = (x) => {
      setprofileArtistName(x);
    };

    //delete artist
    const delArtist = (x) => {
      const headers = {
        "Content-Type": "application/json",
        token: localStorage.token,
      };

      axios
        .post(
          `${backendURL}api/deleteartist`,
          { name: x },
          { headers: headers }
        )
        .then((res) => {
          console.log("del artist", res);
          getFav();
        });
      //get artists after deleting from db
    };

    //map function
    const mapArtists = () => {
      return artists.map(x => {
        return (
          <div key={x.name}>
            <button
              onClick={() => changeName(x.name)}
              className="btn btn-link"
              style={{ display: "inline-block" }}
            >
              {x.name}
            </button>
            <button
              onClick={() => delArtist(x.name)}
              className="btn btn-outline-dark"
            >
              x
            </button>
          </div>
        );
      });
    };

    //get artists
    const getFav = () => {
      const headers = {
        "Content-Type": "application/json",
        token: localStorage.token,
      };
      axios
        .get(`${backendURL}api/getartists`, {
          headers: headers,
        })
        .then((res) => {
          console.log(`res rows`, res.data.rows)
          setArtists(res.data.rows);
        });
    };

    if (isAuthenticated) {
      return (
        <Card className='text-center'>
          <Card.Body>
            <Card.Title>My favorite artists:</Card.Title>
            {mapArtists()}
          </Card.Body>
        </Card>
      );
    } else {
      return <div className="text-center">Login to save artists</div>;
    }
  };

  return (
    <Container>
      <br />
      <br />
      <GetArtists />
      <div style={{ display: "none" }}>{updated}</div>
    </Container>
  );
};

export default Dashboard;
