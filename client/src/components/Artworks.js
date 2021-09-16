import React, { useEffect } from "react";
import axios from "axios";
import returnXappToken from "./artsy/artsy-auth";
import { Container } from "react-bootstrap";
import {ThreeFiber} from "./ThreeFiber";

const Artworks = ({ setAuth }) => {
  const getArt = () => {
    let xappToken = returnXappToken();
    console.log(xappToken)
  };

  useEffect(() => {
    getArt()
  }, []);

  return (
    <div>
      <Container className='text-center my-5'>Artworks</Container>
      <ThreeFiber />
    </div>
  );
};

export default Artworks;
