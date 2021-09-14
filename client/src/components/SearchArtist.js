// import modules
import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendURL, clientID, clientSecret, apiUrl } from "../sharedVariables";

// search artist function
const SearchArtist = ({ updated, passChildData, profileArtistName }) => {
  let [input, setInput] = useState("");
  let [input2, setInput2] = useState("")
  //check if profile artist name changed
  useEffect(() => {
    setInput(profileArtistName);
    setInput2(profileArtistName)
    console.log('new input is', typeof input)
    // searchFor(input)
  }, [profileArtistName]);
  // auto search for artist
  useEffect(()=>{
    if(input!=''){
      searchFor(input)
    }
  },[input2])
  const AddArtist = ({ name }) => {
    let [myName, setmyName] = useState("");
    useEffect(() => {
      setmyName(name);
      console.log("test");
    });
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
          if (updated == "") {
            passChildData("yy");
          } else {
            passChildData("");
          }
        });
    };
    return (
      <>
        <button onClick={addToFavs}>add to favs</button>
      </>
    );
  };
  // artist detail function
  const ArtistDetail = () => {
    if (!searched) {
      return <div></div>;
    } else {
      return (
        <div>
          <h4>{result.title}</h4>
          <AddArtist name={result.title} />
          <br />
          <a
            href={result["_links"].permalink.href}
            target="_blank"
            rel="noreferrer"
          >
            <img src={result["_links"].thumbnail.href}></img>
          </a>
          <div id="biography">{bio == "" ? "no bio available" : bio}</div>
        </div>
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

  const searchFor = async (z) => {
    // debugger;
    let data = await search(z);
    console.log("data is", data);
    if (data == "no-artist-found") {
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
    console.log("biography", res3.data.biography);
    setBio(res3.data.biography);
    console.log("bio", bio);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchFor(input)
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
      `https://api.artsy.net/api/search?q=${input}+more:pagemap:metatags-og_type:artist`,
      {
        headers: {
          "X-XAPP-Token": xappToken,
        },
      }
    );
    //check type artist
    console.log("results", res2.data._embedded.results[0]);
    // if(res2.data._embedded.results[0]== undefined){
    //   return 'undefined'
    // }
    if (res2.data._embedded.results[0].type == "artist") {
      return res2.data._embedded.results[0];
    } else {
      return "no-artist-found";
    }
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
