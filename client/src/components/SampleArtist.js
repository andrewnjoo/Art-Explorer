// import dependencies
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Carousel } from "react-bootstrap";
import { artists, clientID, clientSecret, apiUrl } from "../sharedVariables";


export const SampleArtist = () => {

  let xappToken;
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

  useEffect(() => {
    let x = Math.floor(Math.random() * artists.length);
    search(artists[x]);
  }, []);

  //search for artist
  const search = async (input) => {
    //get auth-token
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
    <Container className="mt-3" style={{ textAlign: "center" }}>
      <Carousel>
        
  {/* <Carousel.Item>
    <img
      className="d-block"
      src="https://d32dm0rphc51dk.cloudfront.net/6-yJkIA0QyGHE8nUteBECw/square.jpg"
      alt="First slide"
      height='100'
      width='100'
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block"
      src="https://d32dm0rphc51dk.cloudfront.net/95EYpbkhcWsEKG18njyhCw/square.jpg"
      alt="Second slide"
      height='100'
      width='100'
    />
  </Carousel.Item> */}
</Carousel>

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
