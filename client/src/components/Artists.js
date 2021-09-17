import React, { useState, useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import axios from "axios";
import { apiUrl, client_id, client_secret } from "../sharedVariables";

console.log();
const Artists = ({ isAuthenticated }) => {
  let [loading, setLoading] = useState(false);
  let [genes, setGenes] = useState([]);
  let [initial] = useState([]);

  useEffect(() => {
    getGenes("4d8b92854eb68a1b2c0001b6"); //hockney
  }, []);

  //get artsy genes
  const getGenes = async (input) => {
    const res = await axios.post(apiUrl, { client_id, client_secret });
    let headers = { "X-XAPP-Token": res.data.token };
    axios
      .get(`https://api.artsy.net/api/genes?artist_id=${input}`, { headers })
      .then((res1) => {
        let genesCopy = genes;
        console.log("initial", initial);
        for (let i in res1.data._embedded.genes) {
          let obj = {};
          obj.name = res1.data._embedded.genes[i]["display_name"];
          obj.description = res1.data._embedded.genes[i].description
            .replace(/ *\([^)]*\) */g, " ") //replace parens and square brackets
            .replace(/[\[\]']+/g, "");
          obj.src = res1.data._embedded.genes[i]["_links"].thumbnail.href;
          genesCopy.push(obj);
        }
        setGenes(genesCopy);
        if (!loading) setLoading(true);
      });
  };

  // conditional render
  const renderIf = () => {
    return !loading ? (
      <div>loading</div>
    ) : (
      genes.map((x) => {
        if (x.name !== null) {
          return (
            <Card style={{ width: "80%", margin: "auto" }}>
              <Card.Img
                style={{ width: "150px", margin: "auto" }}
                variant="top"
                src={x.src}
              ></Card.Img>
              <Card.Body>
                <Card.Title>{x.name}</Card.Title>
                <Card.Text>{x.description}</Card.Text>
              </Card.Body>
            </Card>
          );
        }
      })
    );
  };

  return (
    <div>
      <Container className="text-center my-5">
        art-genes
        <br />
        <div id="subcontainer">{renderIf()}</div>
        {/* <button onClick={() => getGenes("4d8b92944eb68a1b2c000264")}>
          learn about van gogh
        </button>
        <br />
        <button onClick={() => getGenes("4d8b92684eb68a1b2c00009e")}>
          learn about da vinci
        </button>
        <br />
        <button onClick={() => getGenes("4db455226c0cee664800053c")}>
          learn about basq
        </button> */}
      </Container>
    </div>
  );
};

export default Artists;
