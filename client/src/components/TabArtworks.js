import React, { useEffect } from "react";
import returnXappToken from "./artsy/artsy-auth";
import { Container } from "react-bootstrap";
import {ThreeFiber} from "./ThreeFiber";

const TabArtworks = ({ setAuth }) => {
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
      <ThreeFiber propheight='400px'/>
    </div>
  );
};

export default TabArtworks;
