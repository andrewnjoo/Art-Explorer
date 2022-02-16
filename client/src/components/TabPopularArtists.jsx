import React, { useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import axios from 'axios';
import {
  backendURL, apiUrl, clientID, clientSecret,
} from '../sharedVariables';

export default function TabPopularArtists() {
  const [popular, setPopular] = useState([]);

  const search = async (input) => {
    // setSearched(true);
    // console.log(searched);
    // get token
    const res = await axios.post(apiUrl, {
      client_id: clientID,
      client_secret: clientSecret,
    });
    // console.log('xapptoken', res.data.token)
    const xappToken = res.data.token;
    // search artist
    const res2 = await axios.get(
      `https://api.artsy.net/api/search?q=${input}`,
      {
        headers: {
          'X-XAPP-Token': xappToken,
        },
      },
    );
    // console.log('res2', res2);
    // console.log(res2.data._embedded);
    // loop and search for artist
    for (let i = 0; i < res2.data._embedded.results.length; i += 1) {
      if (res2.data._embedded.results[i].type === 'artist') {
        return res2.data._embedded.results[i];
      }
    }
    // if not artist found
    return 'no-artist-found';
  };

  const getPopularArtists = () => {
    const headers = {
      // set headers
      'Content-Type': 'application/json',
      token: localStorage.token,
    };
    axios
      .get(`${backendURL}api/getpopularartists`, {
        headers,
      })
      .then((res) => {
        setPopular(res.data.rows);
        console.log(res.data.rows);
        res.data.rows.forEach((x, idx) => {
          // delay API request to prevent error code 429
          setTimeout(async () => {
            const y = (await search(x.name));
            console.log(y);
            console.log(popular);
          }, 100 + idx * 230);
        });
      });
  };

  useEffect(() => {
    getPopularArtists();
  }, []);

  const mapPopular = () => popular.map((artist) => (
    <div>
      {artist.name}
      :&nbsp;
      {artist.count}
      {' '}
      ❤️
    </div>
  ));

  return (
    <Container className="text-center my-5">
      <Card>
        <Card.Title>Popular Artists</Card.Title>
        <Card.Body>
          <Card.Text>{mapPopular()}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

// notes
// popular artists
// select name,count(*) from artists group by name order by count(*) desc;
