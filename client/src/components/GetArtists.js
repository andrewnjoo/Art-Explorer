import axios from 'axios'
import React from 'react'
import { backendURL } from '../sharedVariables'

export const GetArtists = () => {
    const getFav = () => {
        const headers = {
            "Content-Type": "application/json",
            token: localStorage.token,
          };
        console.log('test')
        axios.get(`${backendURL}api/getartists`,
        {
            "headers": headers
        }).then((res)=>{
            console.log('res',res.data.rows)
        })
    }
    return (
        <div>
            My favorite artists:
            {getFav()}
            
        </div>
    )
}
