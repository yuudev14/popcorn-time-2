import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
const ShowSection = (props) => {
    const {
        type,
        mediaType
    } = props;

    const [shows, setShows] = useState([]);

    const getShow = async() => {
        try {
            const show = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${type.toLowerCase().replace(/[\s]+/g, '_')}?api_key=2effcb37ac7b1550616d653eea9cb4d6&language=en-US&page=1`);
            setShows(show.data.results);
        } catch (error) {
            console.log(error)
            
        }

    }

    useEffect(() => {
        getShow();

    }, [mediaType]);


    return (
        <section className='showSections'>
            <div className='headerShowSection'>
                <h1>{type} {mediaType}</h1>
            </div>
            <div className='previewShowList'>
                {shows.map(show => (
                    <div className='show' key={show.id}>
                        <Link to={`/${mediaType}/details/${show.id}`} className='imageContainer'>
                            <img src={`http://image.tmdb.org/t/p/w500/${show.poster_path}`} />
                            {/* <p>No Image</p> */}
                        </Link>
                        <div className='showShortDetails'>
                            <div className='ratings'>
                                <i className='fa fa-star'></i>
                                <p>{show.vote_average} / 10</p>
                            </div>
                            <h4>{show.title || show.original_name}</h4>
                            <Link to={`/${mediaType}/details/${show.id}`}>
                                <button>More Details</button>
                            </Link>
                        </div>
                    </div>

                ))}
                

            </div>
            
        </section>
    )
}

export default ShowSection
