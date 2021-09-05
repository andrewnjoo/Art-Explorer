// import modules
import axios from "axios";
import {useState} from 'react'

// declare variables
let clientID = "d7b5e06fed971b560f2f";
let clientSecret = "92122aaf680fe0def89ce3bcc6d9d1d5";
let apiUrl = "https://api.artsy.net/api/tokens/xapp_token";
let xappToken;

// export function
const SearchArtist = () => {
    let [input, setInput] = useState("");
    let [result, setResult] = useState("");

    const handleKeyDown = async (event) => {
        if(event.key==='Enter'){
          let data = await search(input)
          // console.log(data)
          setResult(data)
        }
      }
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
    console.log('results',res2.data._embedded.results[0]);
    // console.log(res2.data._embedded.results[0].thumbnail);
    return res2.data._embedded.results[0];
  };
  return (
    <div className='container text-center border mt-5'>
      <h2>get some artists</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <h4>{result.title}</h4>
      <img src={result.['_links'].thumbnail.href}></img>
    </div>
  );
};


export default SearchArtist;