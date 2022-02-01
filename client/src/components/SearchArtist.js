// import modules
import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import {
  backendURL,
  client_id,
  client_secret,
  apiUrl,
  sampleArtists,
} from "../sharedVariables";

// search artist function
const SearchArtist = ({
  profileArtistName,
  isAuthenticated,
  artists,
  getFav
}) => {
  let [input, setInput] = useState("");

  //get from dashboard-app-searchartist
  useEffect(()=>{
    console.log('searchartists-artists are', artists)
  },[artists])

  //check if profile artist name from App.js changed
  useEffect(() => {
    setInput(profileArtistName);
  }, [profileArtistName]); // if profileartistname changed in dashboard, we change input to PAN

  // auto search for artist, if input changes we search for input, no need to type enter
  useEffect(() => {
    if (input !== "") {
      searchFor(input);
    }
  },[input]); // add dependency array to prevent auto searching when typing

  const AddArtistButton = ({ name, isAuthenticated }) => {
    let [myName, setmyName] = useState("");

    //useffect
    useEffect(() => {
      setmyName(name);
      console.log("name is", name);
    }, [name]);

    //add to favorites function
    const addToFavs = () => {
      const headers = {       //set headers
        "Content-Type": "application/json",
        token: localStorage.token,
      };
      axios
        .post(
          `${backendURL}api/addartist`,
          {
            name: myName,
          },
          {
            headers: headers,
          }
        )
        .then(res => {
          getFav()
        });
    };
    if (!isAuthenticated) {
      return <div></div>;
    }
    return (
      <div className='my-3'>
        <button className='btn btn-primary'onClick={addToFavs}>Follow</button>
      </div>
    );
  };
  
  // artist detail function
  const ArtistDetail = ({ isAuthenticated }) => {
    if (!searched) {
      return <div></div>;
    } else {
      return (
        <Card style={{border:'none'}}>
          <Card.Body>
            <Card.Title>{result.title}</Card.Title>
            <AddArtistButton name={result.title} isAuthenticated={isAuthenticated} />
            <a
              href={result["_links"].permalink.href}
              target="_blank"
              rel="noreferrer"
            >
              <img alt="thumbnail" src={result["_links"].thumbnail.href}></img>
            </a>
            <Card.Text id="biography">
              {bio === "" ? "no bio available" : bio}
            </Card.Text>
          </Card.Body>
        </Card>
      );
    }
  };

  // function variables
  let xappToken;
  let [searched, setSearched] = useState(false);
  let [result, setResult] = useState({
    _links: {
      permalink: {
        href: "",
      },
      thumbnail: {
        href: "",
      },
    },
    biography: "",
  });
  let [bio, setBio] = useState("");
  let [randomArtist, setrandomArtist] = useState("");

  useEffect(() => {
    getRandomArtist();
  }, []);

  const searchFor = async (input) => {
    let data = await search(input);
    // console.log("data is", data);
    if (data === "no-artist-found") {
      let resultCopy = result;
      resultCopy.title = "artist not found";
      setResult(resultCopy);
      return;
    }
    setResult(data);
    let bioURL = data["_links"].self.href;
    //get artist biography
    const res3 = await axios.get(bioURL, {
      headers: {
        "X-XAPP-Token": xappToken,
      },
    });
    //console.log(res3)
    // console.log("biography", res3.data.biography);
    setBio(res3.data.biography);
    // console.log("bio", bio);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchFor(input);
    }
  };
  const search = async (input) => {
    setSearched(true);
    console.log(searched);
    //get token
    const res = await axios.post(apiUrl, {
      client_id,
      client_secret,
    });
    // console.log('xapptoken', res.data.token)
    xappToken = res.data.token;
    //search artist
    const res2 = await axios.get(
      `https://api.artsy.net/api/search?q=${input}`,
      {
        headers: {
          "X-XAPP-Token": xappToken,
        },
      }
    );
    console.log('res2',res2)
    console.log(res2.data._embedded);
    // loop and search for artist
    for (let i in res2.data._embedded.results) {
      if (res2.data._embedded.results[i].type === "artist") {
        return res2.data._embedded.results[i];
      }
    }
    // if not artist found
    return "no-artist-found";
  };
  const getRandomArtist = () => {
    setrandomArtist(sampleArtists[Math.floor(Math.random() * sampleArtists.length)]);
  };
  if (!searched) {
    return (
      <div className="container text-center border mt-5">
        <h2>Search for artists</h2>
        <h4
          onClick={() => {
            searchFor(randomArtist);
            getRandomArtist();
          }}
        >
          e.g. &nbsp;
          {randomArtist}
        </h4>
        <br />
        <input
          style={{ minWidth: "220" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    );
  } else {
    return (
      <div className="container text-center border my-2">
        <h2>Search for artists</h2>
        <h4
          onClick={() => {
            searchFor(randomArtist);
            getRandomArtist();
          }}
        >
          e.g. &nbsp;
          {randomArtist}
        </h4>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <ArtistDetail isAuthenticated={isAuthenticated} />

        <div className="mb-5"></div>
      </div>
    );
  }
};

export default SearchArtist;
