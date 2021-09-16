import { apiUrl, client_id, client_secret} from "../../sharedVariables";
import axios from "axios";

const returnXappToken = async () => {
  const res = await axios.post(apiUrl, {
    client_id,
    client_secret,
  });
  let xappToken = res.data.token;
  console.log(xappToken)
  return xappToken
};

export default returnXappToken