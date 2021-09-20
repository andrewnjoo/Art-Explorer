import React, { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import axios from "axios";
import { backendURL } from "../sharedVariables";

export const TabPopularArtists = () => {
  let [popular, setPopular] = useState([]);
  useEffect(() => {
    getPopularArtists();
  }, []);
  const getPopularArtists = () => {
    const headers = {
      //set headers
      "Content-Type": "application/json",
      token: localStorage.token,
    };
    axios
      .get(`${backendURL}api/getpopularartists`, {
        headers,
      })
      .then((res) => {
        console.log(res.data.rows);
        setPopular(res.data.rows);
      });
  };
  const mapPopular = () => {
    return popular.map((x) => {
      return (
        <div>
          {x.name}, {x.count} followers
        </div>
      );
    });
  };

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
};

// popular artists
//select name,count(*) from artists group by name order by count(*) desc;
