import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import returnXappToken from './artsy/artsy-auth';
import ThreeFiber from './ThreeFiber';

function TabArtworks() {
  const getArt = () => {
    const xappToken = returnXappToken();
    console.log(xappToken);
  };

  useEffect(() => {
    getArt();
  }, []);

  return (
    <div>
      <Container className="text-center my-5">
        <h2>Artworks</h2>
      </Container>
      <ThreeFiber propheight="400px" />
    </div>
  );
}

export default TabArtworks;
