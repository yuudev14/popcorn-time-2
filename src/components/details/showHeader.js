import React from 'react'
import { getRandomColor } from '../../utils/method';

const ShowHeader = (props) => {
    const {
        details
    } = props;
    console.log(details);
    return (
        <section id='detailHeader'>
            <img className='backgroundImg' src={`http://image.tmdb.org/t/p/w1280/${details.backdrop_path}`} />
            <div className='background'></div>
            <div className='showTitle'>
                <img src={`http://image.tmdb.org/t/p/w500/${details.poster_path}`} />
                <h1>{details.title || details.name}</h1>
                <p className='tagline'>{details.tagline}</p>
                <ul>
                    {details.genres.map(genre => (
                        <li style={{backgroundColor : getRandomColor()}}>{genre.name}</li>

                    ))}
                </ul>
            </div>
            <div className='headerInfo'>             
                <div className='rating'>
                    <i className='fa fa-star'></i>
                    <p>{details.vote_average}/10</p>
                </div>
            </div>
        </section>

    )
}

export default ShowHeader
