import { useEffect } from "react";

function App() {
  let [input, setInput] = useEffect('')
  return (
    <div className="App">
      <h2>get some artists</h2>
      <input value={input} onChange={}/>      
    </div>
  );
}

export default App;
