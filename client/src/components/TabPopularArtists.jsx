import React, { useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import axios from 'axios';
import {
  backendURL, apiUrl, clientID, clientSecret,
} from '../sharedVariables';

let flag = true;

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
      });
  };

  const mapArtists = () => popular.map((artist) => (
    <div className="grid-item">
      <h4>{artist.name}</h4>
      <a href={artist?.artsy?._links?.permalink?.href} target="_blank" rel="noreferrer">
        <img
          alt=""
          style={{ width: '100px' }}
          src={artist?.artsy?._links?.thumbnail?.href}
        />
      </a>
      <br />
      {artist.count}
      {' '}
      ❤️
    </div>
  ));

  useEffect(() => {
    getPopularArtists();
  }, []);

  useEffect(() => {
    async function getNew(name) {
      const artsyData = await search(name);
      return artsyData;
    }

    if (popular.length > 0 && flag) {
      // so we don't call this function infinitely
      flag = false;
      popular.forEach((ele, idx) => {
        setTimeout(async () => {
          const apiData = await getNew(ele.name);
          const newState = [...popular];
          newState[idx].artsy = apiData;
          // console.log(newState);
          setPopular(newState);
        }, 200 + idx * 230);
      });
    }
  }, [popular]);

  return (
    <Container className="text-center my-5">
      <h2 className="my-5">
        Popular Artists
      </h2>
      <Card>
        <Card.Body>
          <Card.Text>
            <div className="grid-container">
              {mapArtists()}
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

// notes
// popular artists
// select name,count(*) from artists group by name order by count(*) desc;
