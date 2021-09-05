//import dependencies
import { searchArtist } from "./components/searchArtist";
import { useState } from "react";
import MyNavbar from './components/MyNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';

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
