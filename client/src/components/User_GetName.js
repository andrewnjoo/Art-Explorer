import React, {useState, useEffect} from "react";
import { backendURL } from "../sharedVariables";

export const User_GetName = ({setName}) => {

  //get name of user
  useEffect(() => {
    getName();
  }, []);

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
