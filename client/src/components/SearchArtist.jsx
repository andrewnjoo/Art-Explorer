// import modules
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import {
  backendURL,
  clientID,
  clientSecret,
  apiUrl,
  sampleArtists,
} from '../sharedVariables';

// search artist function
function SearchArtist({
  profileArtistName,
  isAuthenticated,
  artists,
  getFav,
}) {
  // function variables
  const [input, setInput] = useState('');
  let xappToken;
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState({
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
  const [bio, setBio] = useState('');
  const [randomArtist, setrandomArtist] = useState('');

  // get from dashboard-app-searchartist
  useEffect(() => {
    console.log('searchartists-artists are', artists);
  }, [artists]);

  // check if profile artist name from App.js changed
  useEffect(() => {
    setInput(profileArtistName);
  }, [profileArtistName]); // if profileartistname changed in dashboard, we change input to PAN

  const search = async (input) => {
    setSearched(true);
    console.log(searched);
    // get token
    const res = await axios.post(apiUrl, {
      client_id: clientID,
      client_secret: clientSecret,
    });
    // console.log('xapptoken', res.data.token)
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
    console.log('res2', res2);
    console.log(res2.data._embedded);
    // loop and search for artist
    for (let i = 0; i < res2.data._embedded.results.length; i += 1) {
      if (res2.data._embedded.results[i].type === 'artist') {
        return res2.data._embedded.results[i];
      }
    }
    // if not artist found
    return 'no-artist-found';
  };

  const searchFor = async (input) => {
    const data = await search(input);
    // console.log("data is", data);
    if (data === 'no-artist-found') {
      const resultCopy = result;
      resultCopy.title = 'artist not found';
      setResult(resultCopy);
      return;
    }
    setResult(data);
    const bioURL = data._links.self.href;
    // get artist biography
    const res3 = await axios.get(bioURL, {
      headers: {
        'X-XAPP-Token': xappToken,
      },
    });
    // console.log(res3)
    // console.log("biography", res3.data.biography);
    setBio(res3.data.biography);
    // console.log("bio", bio);
  };

  // auto search for artist, if input changes we search for input, no need to type enter
  useEffect(() => {
    if (input !== '') {
      searchFor(input);
    }
  }, [input]); // add dependency array to prevent auto searching when typing

  function AddArtistButton({ name, isAuthenticated }) {
    const [myName, setmyName] = useState('');

    // useffect
    useEffect(() => {
      setmyName(name);
      console.log('name is', name);
    }, [name]);

    // add to favorites function
    const addToFavs = () => {
      const headers = { // set headers
        'Content-Type': 'application/json',
        token: localStorage.token,
      };
      axios
        .post(
          `${backendURL}api/addartist`,
          {
            name: myName,
          },
          {
            headers,
          },
        )
        .then(() => {
          getFav();
        });
    };
    if (!isAuthenticated) {
      return <div />;
    }
    return (
      <div className="my-3">
        <button
          type="button"
          className="btn btn-primary btn-rounded"
          onClick={addToFavs}
        >
          Follow

        </button>
      </div>
    );
  }

  // artist detail function
  function ArtistDetail({ isAuthenticated }) {
    if (!searched) {
      return <div />;
    }
    return (
      <Card style={{ border: 'none' }}>
        <Card.Body>
          <Card.Title>{result.title}</Card.Title>
          <AddArtistButton name={result.title} isAuthenticated={isAuthenticated} />
          <a
            href={result._links.permalink.href}
            target="_blank"
            rel="noreferrer"
          >
            <img alt="thumbnail" src={result._links.thumbnail.href} />
          </a>
          <Card.Text id="biography" style={{ margin: '20px 50px' }}>
            {bio === '' ? 'no bio available' : bio}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchFor(input);
    }
  };
  const getRandomArtist = () => {
    setrandomArtist(sampleArtists[Math.floor(Math.random() * sampleArtists.length)]);
  };

  useEffect(() => {
    getRandomArtist();
  }, []);

  if (!searched) {
    return (
      <div className="container text-center border mt-5">
        <div className="my-5">
          <h2 className="mt-3">Search for artists</h2>
          <button
            className="search-button"
            type="button"
            onClick={() => {
              searchFor(randomArtist);
              getRandomArtist();
            }}
          >
            e.g. &nbsp;
            {randomArtist}
          </button>
          <br />
          <input
            style={{ minWidth: '220' }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="container text-center border my-2">
      <div className="my-5">
        <h2>Search for artists</h2>
        <button
          className="search-button"
          type="button"
          onClick={() => {
            searchFor(randomArtist);
            getRandomArtist();
          }}
        >
          e.g. &nbsp;
          {randomArtist}
        </button>
        <br />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <ArtistDetail isAuthenticated={isAuthenticated} />

        <div className="mb-5" />
      </div>
    </div>
  );
}

export default SearchArtist;
