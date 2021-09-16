import React, {useEffect} from 'react'
import axios from 'axios'
import returnXappToken from './artsy/artsy-auth'

const Artworks = ({setAuth}) => {

    const getArt = () => {
        let xappToken = returnXappToken()
        console.log(xappToken)
    }

    useEffect(() => {
        getArt()
    }, [])

    return (
        <div>
                art
                lots of art
        </div>
    )
}

export default Artworks