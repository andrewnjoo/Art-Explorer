import React, { useEffect } from "react";
import axios from "axios";
import returnXappToken from "./artsy/artsy-auth";
import { Container } from "react-bootstrap";

const Artworks = ({ setAuth }) => {
  const getArt = () => {
    let xappToken = returnXappToken();
  };

  useEffect(() => {
    // getArt()
  }, []);

  return (
    <div>
      <Container className='text-center my-5'>Artworks</Container>
    </div>
  );
};

export default Artworks;
