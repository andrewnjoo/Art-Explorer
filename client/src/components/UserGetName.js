import React, {useEffect} from "react";
import { backendURL } from "../sharedVariables";

export const UserGetName = ({setName, trigger}) => {

  //get name of user
  useEffect(() => {
    getName();
  }, []);
  useEffect(() => {
    // console.log('test trigger')
    getName();
  }, [trigger]);

  async function getName() {
    try {
      const response = await fetch(`${backendURL}dashboard/`, {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();
      // console.log(parseRes);

      //set name
      setName(parseRes.user_name);
    } catch (err) {
      console.error(err.message);
    }
  }
  return <div></div>;
};
