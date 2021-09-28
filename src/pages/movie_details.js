import React, {useEffect} from 'react';
import '../styles/details/details.scss';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { setDetailsAction, setEmptyDetailAction } from '../store/action/detailsActon';
import ShowHeader from '../components/details/showHeader';
import Overview from '../components/details/overview';
import Reviews from '../components/details/reviews';

const MovieDetails = (props) => {
    const {
        setDetailsDispatch,
        details,
        setEmptyDetailDispatch,
    }  = props;

    
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
