import axios from 'axios';
import { apiUrl, clientID, clientSecret } from '../../sharedVariables';

const returnXappToken = async () => {
  const res = await axios.post(apiUrl, {
    clientID,
    clientSecret,
  });
  const xappToken = res.data.token;
  console.log('xapptoken', xappToken);
  return xappToken;
};

export default returnXappToken;
