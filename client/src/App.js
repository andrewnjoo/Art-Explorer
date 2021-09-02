//import dependencies
import axios from 'axios'
import { useState } from "react";
import MyNavbar from './components/MyNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';

//declare vars
let clientID = "d7b5e06fed971b560f2f";
let clientSecret = "92122aaf680fe0def89ce3bcc6d9d1d5";
let apiUrl = "https://api.artsy.net/api/tokens/xapp_token";
let xappToken;

//search for artist
const searchArtist = async (input) => {
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
  // console.log(res2);
  return res2.data._embedded.results[0].title
};

function App() {
  let [input, setInput] = useState("");
  let [result, setResult] = useState("");

  const handleKeyDown = async (e) => {
    if(e.key==='Enter'){
      let data = await searchArtist(input)
      // console.log(data)
      setResult(data)
    }
  }
  return (
    <div className="App">
      <MyNavbar/>
      <h2>get some artists</h2>
      <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} />
      <h4>{result}</h4>
    </div>
  );
}

export default App;
