import React, {useState, useEffect} from 'react'
import { backendURL } from "../sharedVariables";

const Profile = () => {
    const [name, setName] = useState("");

    async function getName() {
        try {
          const response = await fetch(`${backendURL}dashboard/`, {
            method: "GET",
            headers: { token: localStorage.token },
          });
          const parseRes = await response.json();
    
          console.log(parseRes);
          //set name
          setName(parseRes.user_name);
        } catch (err) {
          console.error(err.message);
        }
      }

  useEffect(() => {
    getName();
  });
    return (
        <div>
            Welcome {name}
        </div>
    )
}

export default Profile;