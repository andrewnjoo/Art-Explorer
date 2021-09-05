// import modules
import axios from 'axios'

// declare variables
let clientID = "d7b5e06fed971b560f2f";
let clientSecret = "92122aaf680fe0def89ce3bcc6d9d1d5";
let apiUrl = "https://api.artsy.net/api/tokens/xapp_token";
let xappToken;

// export function
export const searchArtist = async (input) =>  {
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
