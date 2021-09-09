import axios from "axios";
import React, {useEffect, useState} from "react";
import { backendURL } from "../sharedVariables";

export const AddArtist = ({name}) => {
  let [myName, setmyName] = useState('')
  useEffect(()=>{
    setmyName(name)   
    console.log('test')
  })
  const addToFavs = () => {
    //set headers
    const headers = {
      "Content-Type": "application/json",
      token: localStorage.token,
    };
    console.log("test");
    axios
      .post(
        `${backendURL}api/addartist`,
        {
          "name": myName,
        },
        {
          "headers": headers,
        }
      )
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <>
      <button onClick={addToFavs}>add to favs</button>
    </>
  );
};
