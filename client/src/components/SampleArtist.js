import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";

export const SampleArtist = () => {
  let artists = [
    "KAWS",
    "Claude Monet",
    "Van Gogh",
    "Picasso",
    "Ai Weiwei",
    "Tintoretto",
    "Raphael",
    "Da Vinci",
    "Banksy",
    "Paul Gauguin"
  ];
  let [artist, setArtist] = useState({
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
  let apiUrl = "https://api.artsy.net/api/tokens/xapp_token";
  const clientID = "d7b5e06fed971b560f2f";
  const clientSecret = "92122aaf680fe0def89ce3bcc6d9d1d5";
  let xappToken;
  useEffect(() => {
    let x = Math.floor(Math.random() * artists.length);
    console.log("x is", x);
    search(artists[x]);
  }, []);
  const search = async (input) => {
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
    // return res2.data._embedded.results[0];
    setArtist(res2.data._embedded.results[0]);
  };

  return (
    <Container style={{ textAlign: "center" }}>
      <h4>{artist.title}</h4>
      <br />
      <a
        href={artist["_links"].permalink.href}
        target="_blank"
        rel="noreferrer"
      >
        <img src={artist["_links"].thumbnail.href}></img>
      </a>
      {/* <div id="biography">{bio == "" ? "no bio available" : bio}</div> */}
    </Container>
  );
};
