import React, { useState, useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import axios from 'axios';
import { apiUrl, clientID, clientSecret } from '../sharedVariables';

function TabeLearnAbout() {
  const [loading, setLoading] = useState(false);
  const [genes, setGenes] = useState([]);
  const [initial] = useState([]);

  // get artsy genes
  const getGenes = async (input) => {
    const res = await axios.post(apiUrl, {
      client_id: clientID,
      client_secret: clientSecret,
    });
    const headers = { 'X-XAPP-Token': res.data.token };
    console.log('resss', res);
    axios
      .get(`https://api.artsy.net/api/genes?artist_id=${input}`, { headers })
      .then((res1) => {
        const genesCopy = genes;
        console.log('initial', initial);
        for (let i = 0; i < res1.data._embedded.genes.length; i += 1) {
          const obj = {};
          obj.name = res1.data._embedded.genes[i].display_name;
          obj.description = res1.data._embedded.genes[i].description
            .replace(/ *\([^)]*\) */g, ' ') // replace parens and square brackets
            .replace(/[[\]']+/g, '');
          obj.src = res1.data._embedded.genes[i]._links.thumbnail.href;
          genesCopy.push(obj);
        }
        setGenes(genesCopy);
        if (!loading) setLoading(true);
      });
  };

  useEffect(() => {
    // hockney
    getGenes('4d8b92854eb68a1b2c0001b6');
    // van gogh 4d8b92944eb68a1b2c000264
    // basquiat 4db455226c0cee664800053c
    // da vinci 4d8b92684eb68a1b2c00009e
  });

  // conditional render
  const renderIf = () => (!loading ? (
    <div>loading</div>
  ) : (
    genes.map((x) => {
      if (x.name !== null) {
        return (
          <Card style={{ width: '70%', margin: 'auto' }}>
            <Card.Title>{x.name}</Card.Title>
            <Card.Body>
              <Card.Img
                style={{ width: '150px', margin: 'auto' }}
                variant="top"
                src={x.src}
              />
              <Card.Text>{x.description}</Card.Text>
            </Card.Body>
          </Card>
        );
      } return (<div />);
    })
  ));

  return (
    <div>
      <Container className="text-center my-5">
        <h2>
          Learn about Art Movements
        </h2>
        <br />
        <div id="subcontainer">{renderIf()}</div>

      </Container>
    </div>
  );
}

export default TabeLearnAbout;
