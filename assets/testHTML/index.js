
//declare vars
let clientID = "d7b5e06fed971b560f2f";
let clientSecret = "92122aaf680fe0def89ce3bcc6d9d1d5";
let apiUrl = "https://api.artsy.net/api/tokens/xapp_token";
let xappToken;
let input = document.getElementById('input')
let result = document.getElementById('result')

input.addEventListener("keyup", function(e){
    if(e.key==='Enter'){
        searchArtist(input.value)
    }
})

//search for artist
const searchArtist = async (input) => {
  //get token
  const res = await axios.post(apiUrl, {
    client_id: clientID,
    client_secret: clientSecret,
  });
  // console.log('xapptoken',res.data.token)
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
  console.log(res2);
  result.innerHTML = res2.data._embedded.results[0].title
};
