// const backendURL = "http://localhost:4001/"; //local
const backendURL = "https://protected-reaches-25441.herokuapp.com/"; //prod

//artsy
const client_id = "d7b5e06fed971b560f2f";
const client_secret = "92122aaf680fe0def89ce3bcc6d9d1d5";
let apiUrl = "https://api.artsy.net/api/tokens/xapp_token";

// sample artists
const artists = [
  "KAWS",
  "Claude Monet",
  "Van Gogh",
  "Picasso",
  "Ai Weiwei",
  "Tintoretto",
  "Raphael",
  "Da Vinci",
  "Banksy",
  "Paul Gauguin",
  "Richard Serra",
  "David Hockney",
  "El Greco",
  // "Elmgreen & Dragset",
  // "Michael Heizer", bugs
  "Jean-Michel Basquiat",
  "Cai Guo-Qiang 蔡国强",
  "Auguste Rodin",
  "Michelangelo Buonarroti",
  "Andy Warhol",
  "Yves Klein",
  "Joseph Beuys",
  "Mark Rothko",
  "Jackson Pollock",
  "Georgia O’Keeffe",
  "Wassily Kandinsky",
  "Norman Rockwell",
  "Takashi Murakami",
  "Yayoi Kusama",
  "Marina Abramović",
  "Lee Bul"
];

const artImages = [
  'https://d32dm0rphc51dk.cloudfront.net/X9vVvod7QY73ZwLDSZzljw/square.jpg',
  'https://raw.githubusercontent.com/adnjoo/artExplorer/main/assets/mona2.png'
]

export {
    backendURL,
    client_id,
    client_secret,
    apiUrl,
    artists,
    artImages
}
