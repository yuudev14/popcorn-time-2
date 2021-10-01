import React, {useEffect} from 'react';
import '../styles/details/details.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { setDetailsAction, setEmptyDetailAction } from '../store/action/detailsActon';
import ShowHeader from '../components/details/showHeader';
import Overview from '../components/details/overview';
import Reviews from '../components/details/reviews';

const MovieDetails = (props) => {

    const details = useSelector(state => state.details);
    const dispatch = useDispatch()
    const {id} = useParams();

    useEffect(() => {
        (async() => {
            try{
                await dispatch(setDetailsAction(id, 'movie'));
            }catch(e){
            }
        })()

        return () => {
            dispatch(setEmptyDetailAction())
        }
    }, []);

    return (
        <div id='details'>
            {Object.keys(details).length > 0 && (
                <>
                    <ShowHeader details={ details }/>
                    <section id='overview_reviews'>
                        <Overview details= {details} />
                        <Reviews details= {details} />
                    </section>
                    
                </>
            )}
        </div>
    )
}

export default MovieDetails
