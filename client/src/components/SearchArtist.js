// import modules
import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import {
  backendURL,
  client_id,
  client_secret,
  apiUrl,
  artists,
} from "../sharedVariables";
import Heart from "react-animated-heart";

// search artist function
const SearchArtist = ({
  updated,
  passChildData,
  profileArtistName,
  isAuthenticated,
}) => {
  let [input, setInput] = useState("");
  let [input2, setInput2] = useState("");

  //check if profile artist name changed
  useEffect(() => {
    setInput(profileArtistName);
    setInput2(profileArtistName);
    // searchFor(input)
  }, [profileArtistName]);
  // auto search for artist
  useEffect(() => {
    if (input !== "") {
      searchFor(input);
    }
  });

  const AddArtistButton = ({ name, isAuthenticated }) => {
    // const [isClick, setClick] = useState(false);
    let [myName, setmyName] = useState("");

    //useffect
    useEffect(() => {
      setmyName(name);
      // setClick(true)
      console.log("name is", name);
    }, []);

    const addToFavs = () => {
      //set headers
      const headers = {
        "Content-Type": "application/json",
        token: localStorage.token,
      };
      // console.log("test");
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
        .then((res) => {
          console.log("added artist", res);
          if (updated === "") {
            passChildData("yy");
          } else {
            passChildData("");
          }
        });
    };
    // if not auth dont return heart
    if (!isAuthenticated) {
      return <div></div>;
    }
    // if already in array isclick should be on
    return (
      <div className='my-3'>
        {/* <Heart isClick={isClick} onClick={()=>setClick(!isClick)} /> */}
        <button onClick={addToFavs}>add to favs</button>
      </div>
    );
  };
  // artist detail function
  const ArtistDetail = ({ isAuthenticated }) => {
    if (!searched) {
      return <div></div>;
    } else {
      return (
        <Card>
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
    xappToken = res.data.token;
    //search artist
    const res2 = await axios.get(
      `https://api.artsy.net/api/search?q=${input}+more:pagemap:metatags-og_type:artist`,
      {
        headers: {
          "X-XAPP-Token": xappToken,
        },
      }
    );
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
    setrandomArtist(artists[Math.floor(Math.random() * artists.length)]);
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
