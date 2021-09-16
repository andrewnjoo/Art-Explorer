// const backendURL = "http://localhost:4001/"; //local
const backendURL = "https://protected-reaches-25441.herokuapp.com/"; //prod

//artsy
const client_id = "d7b5e06fed971b560f2f";
const client_secret = "92122aaf680fe0def89ce3bcc6d9d1d5";
let apiUrl = "https://api.artsy.net/api/tokens/xapp_token";

// sample artists
const artists = [
  "Ai Weiwei",
  "Andy Warhol",
  "Auguste Rodin",
  "Banksy",
  "Cai Guo-Qiang 蔡国强",
  "Claude Monet",
  "Da Vinci",
  "Damien Hirst",
  "David Hockney",
  "El Greco",
  "Elmgreen & Dragset",
  "Georgia O’Keeffe",
  "Jackson Pollock",
  "Jean-Michel Basquiat",
  "Joseph Beuys",
  "KAWS",
  "Lee Bul",
  "Marina Abramović",
  "Mark Rothko",
  "Michael Heizer",
  "Michelangelo Buonarroti",
  "Norman Rockwell",
  "Paul Gauguin",
  "Picasso",
  "Raphael",
  "Richard Serra",
  "Takashi Murakami",
  "Tintoretto",
  "Van Gogh",
  "Wassily Kandinsky",
  "Yayoi Kusama",
  "Yves Klein",
];

console.log(artists.sort());

const artImages = [
  "https://d32dm0rphc51dk.cloudfront.net/X9vVvod7QY73ZwLDSZzljw/square.jpg",
  "https://raw.githubusercontent.com/adnjoo/artExplorer/main/assets/mona2.png",
];

export { backendURL, client_id, client_secret, apiUrl, artists, artImages };
