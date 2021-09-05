//import dependencies
import SearchArtist from "./components/SearchArtist";
import MyNavbar from './components/MyNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <MyNavbar/>
      <SearchArtist />
    </div>
  );
}

export default App;
