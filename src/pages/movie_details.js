import React, {useEffect, useState} from 'react';
import '../styles/details/details.scss';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { setDetailsAction, setEmptyDetailAction } from '../store/action/detailsActon';
import ShowHeader from '../components/details/showHeader';

const MovieDetails = (props) => {
    const {
        setDetailsDispatch,
        details,
        setEmptyDetailDispatch,
    }  = props;

    const [trailerIndex, setTrailerIndex] = useState(0);
    const {id} = useParams();
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
    }, []);

    const updateTrailerIndex = (num) => {
        if(trailerIndex + num > details.videos.length - 1){
            setTrailerIndex(details.videos.length - 1)
        }else if(trailerIndex + num < 0){
            setTrailerIndex(0)
        }else{
            setTrailerIndex(trailerIndex + num)
        }
    }

    return (
        <div id='details'>
            {Object.keys(details).length > 0 && (
                <>
                    <ShowHeader details={ details }/>
                    <section id='overview_reviews'>
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
                        </div>
                        <div className='reviews'>
                            <h2>Reviews</h2>
                            <div className='reviewContainer'>
                                { details.reviews.map(review => (
                                    <div className='review'>
                                        <p className='date'>{review.created_at}</p>
                                        <p>{review.content}</p>
                                    </div>

                                )) }
                            </div>
                        </div>
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
