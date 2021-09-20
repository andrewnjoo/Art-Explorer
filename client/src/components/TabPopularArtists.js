import React from 'react'
import { Container } from 'react-bootstrap'

export const TabPopularArtists = () => {
    return (
        <Container className='text-center my-5'>
            Popular Artists
        </Container>
    )
}


// popular artists
//select name,count(*) from artists group by name order by count(*) desc;