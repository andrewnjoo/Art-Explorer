import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card } from 'react-bootstrap';
import { backendURL } from '../sharedVariables';

// dashboard function
function Dashboard({
  setprofileArtistName, isAuthenticated, artists,
  // setArtists,
  getFav,
}) {
  const [initial, setInitial] = useState(false);
  // get artists
  const GetArtists = React.memo(() => {
    // get favorite artists
    useEffect(() => {
      if (!initial) {
        getFav();
        setInitial(true);
      }
    });

    // send from dashboard to app to searchartist
    const changeName = (x) => setprofileArtistName(x);

    // delete artist
    const delArtist = (x) => {
      const headers = {
        'Content-Type': 'application/json',
        token: localStorage.token,
      };

      axios
        .post(
          `${backendURL}api/deleteartist`,
          { name: x },
          { headers },
        )
        .then((res) => {
          console.log('del artist', res);
          getFav();
        });
      // get artists after deleting from db
    };

    // map function
    const mapArtists = () => artists.map((x) => (
      <div key={x.name}>
        <button
          type="button"
          onClick={() => changeName(x.name)}
          className="btn btn-link"
          style={{ display: 'inline-block' }}
        >
          {x.name}
        </button>
        <button
          type="button"
          onClick={() => delArtist(x.name)}
          className="btn btn-outline-dark"
        >
          x
        </button>
      </div>
    ));

    // get artists

    if (isAuthenticated) {
      return (
        <Card className="text-center">
          <Card.Body>
            <Card.Title>Dashboard</Card.Title>
            <Card.Subtitle>My favorite artists:</Card.Subtitle>
            {mapArtists()}
          </Card.Body>
        </Card>
      );
    }
    return (<div className="text-center" />);
  });

  return (
    <Container>
      <br />
      <br />
      <GetArtists />
    </Container>
  );
}

export default Dashboard;
