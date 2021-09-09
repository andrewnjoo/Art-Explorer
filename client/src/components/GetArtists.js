import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { backendURL } from '../sharedVariables'

export const GetArtists = () => {
    let [artists, setArtists] = useState([])
    useEffect(()=>{
        getFav()
    },[])
    const mapArtists = ()=>{
        return artists.map((x)=>{
            return (
                <div>{x.name}</div>
            )
        })
    }
    const getFav = () => {
        //set headers
        const headers = {
            "Content-Type": "application/json",
            token: localStorage.token,
          };
        console.log('test')
        //make axios call
        axios.get(`${backendURL}api/getartists`,
        {
            "headers": headers
        }).then((res)=>{
            setArtists(res.data.rows)
        })
    }
    return (
        <div>
            My favorite artists:
            {mapArtists()}
        </div>
    )
}
