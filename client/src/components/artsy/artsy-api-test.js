const apiUrl = 'https://api.artsy.net/api/tokens/xapp_token';
const axios = require('axios');

const clientID = 'd7b5e06fed971b560f2f';
const clientSecret = '92122aaf680fe0def89ce3bcc6d9d1d5';

const dothis = async () => {
  const res = await axios.post(apiUrl, {
    clientID,
    clientSecret,
  });
  const xappToken = res.data.token;
  axios
    // .get(`https://api.artsy.net/api/genes?artist_id=4d8b926a4eb68a1b2c0000ae`, {
    .get('https://api.artsy.net/api/artworks?artist_id=4d8b926a4eb68a1b2c0000ae', {
      headers: {
        'X-XAPP-Token': xappToken,
      },
    })
    .then((res) => {
      console.log(xappToken);
      console.log(res.data);
      // for (i in res.data._embedded.genes) {
      //   console.log(res.data._embedded.genes[i]);
      // }
    });
};

dothis();
