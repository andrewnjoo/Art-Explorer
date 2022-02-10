// import dependencies
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import {
  sampleArtists, clientID, clientSecret, apiUrl,
} from '../sharedVariables';

// sampleartist component
function SampleArtist() {
  let xappToken;
  const [artist, setArtist] = useState({
    _links: {
      permalink: {
        href: '',
      },
      thumbnail: {
        href: '',
      },
    },
    biography: '',
  });

  // search for artist
  const search = async (input) => {
    // get auth-token
    const res = await axios.post(apiUrl, {
      clientID,
      clientSecret,
    });
    xappToken = res.data.token;
    // search artist
    const res2 = await axios.get(
      `https://api.artsy.net/api/search?q=${input}`,
      {
        headers: {
          'X-XAPP-Token': xappToken,
        },
      },
    );
    console.log('results', res2.data._embedded.results[0]);
    // console.log(res2.data._embedded.results[0].thumbnail);
    // return res2.data._embedded.results[0];
    setArtist(res2.data._embedded.results[0]);
  };

  // choose random artist
  useEffect(() => {
    const x = Math.floor(Math.random() * sampleArtists.length);
    search(sampleArtists[x]);
  }, []); // need empty array to prevent infinite searches

  return (
    <Container className="mt-3" style={{ textAlign: 'center' }}>
      <h4>{artist.title}</h4>
      <br />
      <a
        href={artist._links.permalink.href}
        target="_blank"
        rel="noreferrer"
      >
        <img alt="thumbnail" src={artist._links.thumbnail.href} />
      </a>
    </Container>
  );
}

export default SampleArtist;
