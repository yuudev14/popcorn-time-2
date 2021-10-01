import React, {useEffect} from 'react';
import '../styles/details/details.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { setDetailsAction } from '../store/action/detailsActon';
import ShowHeader from '../components/details/showHeader';
import Overview from '../components/details/overview';
import Reviews from '../components/details/reviews';
import { setEmptyDetailAction } from '../store/action/detailsActon';

const TVDetails = (props) => {
    const details = useSelector(state => state.details);
    const dispatch = useDispatch()
    const {id} = useParams();
    useEffect(() => {
        (async() => {
            try{
                await dispatch(setDetailsAction(id, 'tv'));
            }catch(e){
            }
        })();

        return () => {
            dispatch(setEmptyDetailAction());
        }
    }, [])

    return (
        <div id='details'>
            {Object.keys(details).length > 0 && (
                <>
                    <ShowHeader details = {details}/>
                    <section id='overview_reviews'>
                        <Overview details= {details} />
                        <Reviews details= {details} />
                    </section>
                </>
            )}
        </div>
    )
}

export default TVDetails;
