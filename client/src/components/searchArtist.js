// import modules
import axios from "axios";
import { useState } from "react";
import { AddArtist } from "./AddArtist";

// search artist function
const SearchArtist = () => {
  // artist detail function
  const ArtistDetail = () => {
    if (!searched) {
      return <div></div>;
    } else {
      return (
        <div>
          <h4>{result.title}</h4>
          <AddArtist name={result.title}/>
          <br />
          <a href={result["_links"].permalink.href} target="_blank" rel="noreferrer">  
          <img src={result["_links"].thumbnail.href}></img>
          </a>
          <div id="biography">{bio == '' ? 'no bio available' : bio}</div>
        </div>
      );
    }
  };

  // function variables
  const clientID = "d7b5e06fed971b560f2f";
  const clientSecret = "92122aaf680fe0def89ce3bcc6d9d1d5";
  const apiUrl = "https://api.artsy.net/api/tokens/xapp_token";
  let xappToken;
  let [searched, setSearched] = useState(false);
  let [input, setInput] = useState("");
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
  let [bio, setBio] = useState('');

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      let data = await search(input);
      setResult(data);
      let bioURL = data["_links"].self.href;
      //get artist biography
      const res3 = await axios.get(bioURL, {
        headers: {
          "X-XAPP-Token": xappToken,
        },
      });
      //console.log(res3)
      console.log('biography',res3.data.biography);
      setBio(res3.data.biography);
      console.log("bio", bio);
    }
  };
  const search = async (input) => {
    setSearched(true);
    console.log(searched);
    //get token
    const res = await axios.post(apiUrl, {
      client_id: clientID,
      client_secret: clientSecret,
    });
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
    console.log("results", res2.data._embedded.results[0]);
    // console.log(res2.data._embedded.results[0].thumbnail);

    return res2.data._embedded.results[0];
  };
  return (
    <div className="container text-center border mt-5">
      <h2>Search for artists</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <ArtistDetail />
    </div>
  );
};

export default SearchArtist;
