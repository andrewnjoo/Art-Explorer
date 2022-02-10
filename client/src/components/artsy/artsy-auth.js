import axios from 'axios';
import { apiUrl, clientId, clientSecret } from '../../sharedVariables';

const returnXappToken = async () => {
  const res = await axios.post(apiUrl, {
    clientId,
    clientSecret,
  });
  const xappToken = res.data.token;
  console.log('xapptoken', xappToken);
  return xappToken;
};

export default returnXappToken;
