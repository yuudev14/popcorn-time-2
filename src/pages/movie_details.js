import React, {useEffect} from 'react';
import sample from '../assets/sampleCover.jpg';
import sample2 from '../assets/sample.jpg';
import '../styles/details/details.scss';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { setDetailsAction, setEmptyDetailAction } from '../store/action/detailsActon';

const MovieDetails = (props) => {
    const {
        setDetailsDispatch,
        details,
        setEmptyDetailDispatch,
    }  = props;
    const {id} = useParams()
    useEffect(() => {
        (async() => {
            try{
                await setDetailsDispatch(id, 'movie');
            }catch(e){
            }
        })()

        return () => {
            setEmptyDetailDispatch();

        }
    }, [])

    return (
        <div id='details'>
            {Object.keys(details).length > 0 && (
                <>
                    <section id='detailHeader'>
                        <img className='backgroundImg' src={`http://image.tmdb.org/t/p/w1280/${details.backdrop_path}`} />
                        <div className='background'></div>
                        <div className='showTitle'>
                            <img src={`http://image.tmdb.org/t/p/w500/${details.poster_path}`} />
                            <h1>{details.title}</h1>
                            
                            <ul>
                                {details.genres.map(genre => (
                                    <li>{genre.name}</li>

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
                    <section id='overview_reviews'>
                        <div className='overview'>
                            <div className='addFav' >
                                <i className='fa fa-heart'></i>
                                <p>Add To Favorites</p>
                            </div>
                            <div className='synopsis'>
                                <h3>Synopsis</h3>
                                <p>{details.tagline}</p>
                                <p>{details.overview}</p>
                            </div>
                        </div>
                        <div className='reviews'>
                            <div className='review'>
                            </div>
                        </div>
                    </section>
                    <section id='trailers'>
                        <div className='video'>
                        </div>
                        <ul className='videos'>
                        </ul>
                    </section>
                    <section id='photos'>
                        <div className='photoViewer'>
                        </div>
                        <ul className='photosList'>
                        </ul>
                    </section>
                </>
            )}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        details : state.details,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setDetailsDispatch : (id, movie_type) => dispatch(setDetailsAction(id, movie_type)),
        setEmptyDetailDispatch : () => dispatch(setEmptyDetailAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails)
