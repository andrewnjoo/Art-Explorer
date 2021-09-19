import { useState, useEffect } from "react";
import { backendURL } from "../sharedVariables";
import axios from "axios";
import { Container, Card } from "react-bootstrap";

// dashboard function
const Dashboard = ({ setprofileArtistName, isAuthenticated, artists, setArtists, getFav }) => {

  const [initial, setInitial] = useState(false)
  //get artists
  const GetArtists = () => {    
    //get favorite artists
    useEffect(() => {
      if(!initial) {
        getFav()
        setInitial(true)
      } else if (initial) {
        return
      }
    }); 

    //send from dahsboard to app to searchartist
    const changeName = x => setprofileArtistName(x);

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


    if (isAuthenticated) {
      return (
        <Card className='text-center'>
          <Card.Body>
            <Card.Title>Dashboard</Card.Title>
            <Card.Subtitle>My favorite artists:</Card.Subtitle>
            {mapArtists()}
          </Card.Body>
        </Card>
      );
    } else {
      return (<div className="text-center">Login to save artists</div>);
    }
  };

  return (
    <Container>
      <br />
      <br />
      <GetArtists />
    </Container>
  );
};

export default Dashboard;
