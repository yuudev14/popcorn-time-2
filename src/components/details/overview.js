import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Overview = (props) => {
    const {
        details
    } = props;

    const [trailerIndex, setTrailerIndex] = useState(0);

    const updateTrailerIndex = (num) => {
        if(trailerIndex + num > details.videos.length - 1){
            setTrailerIndex(details.videos.length - 1)
        }else if(trailerIndex + num < 0){
            setTrailerIndex(0)
        }else{
            setTrailerIndex(trailerIndex + num)
        }
    }

    const showSeason = (e) => {
        e.target.nextSibling.classList.toggle('showEpisodeList');
    }
    return (
            <div className='overview'>
                <div className='addFav' >
                    <i className='fa fa-heart'></i>
                    <p>Add To Favorites</p>
                </div>
                <div className='synopsis'>
                    <h3>Synopsis</h3>      
                    <p>{details.overview}</p>
                </div>
                { details.videos.length > 0 && (
                    <section id='trailers'>
                        <div className='video'>
                            <i className='fa fa-arrow-left' 
                                onClick={() => updateTrailerIndex(-1)}
                                style={{color : trailerIndex ===  0 ? '#44615e' : '#16bbac'}}
                            ></i>
                            <i className='fa fa-arrow-right' 
                                onClick={() => updateTrailerIndex(1)}
                                style={{color : trailerIndex ===  details.videos.length - 1 ? '#44615e' : '#16bbac'}}
                            ></i>
                            <iframe src={`https://www.youtube.com/embed/${details.videos[trailerIndex].key}`}></iframe>
                        </div>
                    </section>

                ) }
                {/* <section id='photos'>
                    <div className='photoViewer'>
                    </div>
                    <ul className='photosList'>
                    </ul>
                </section> */}
                <section className='seasonSection'>
                    <ul className='seasonList'>
                        {details.seasons && details.seasons.map((season, index) => (
                            <li className='season'>
                                <div className='seasonNum' onClick={showSeason}>Season {index + 1}</div>
                                <ul className='episodeList'>
                                    {Array.from(Array(season.episode_count).keys()).map((n, i) => (
                                        <Link><li>Episode {i + 1}</li></Link>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
    )
}

export default Overview
