import React, { useEffect, useState, useRef} from 'react';
import {usePrevious} from 'react-use';
import { randomNumber, saveFromFavorites } from '../../methods/method';
import { connect } from 'react-redux';
import { getTrendingAction } from '../../store/action/trendingAction';
import {Link} from 'react-router-dom';

const Trending = (props) => {

    const {
        getTrendingDispatch,
        trendings

    } = props;

    const [showNum, setShowNum] = useState(-1);
    const [timeOut, setTimeOut] = useState([]);
    const prevShowNum = usePrevious(showNum);
    const [throttleTime, setThrottleTime] = useState(0);
    const [throttleTime2, setThrottleTime2] = useState(0);
    const [dayMode, setDayMode] = useState('day');
    const prevDayMode = usePrevious(dayMode)

    const colors = ['#62bccc', '#337ac0', '#ee9323', '#F2b922']

    const setShowNumTimeout = () => {
        timeOut.forEach(timeId => {
            clearTimeout(timeId);
        })
        // console.log(showNum, prevShowNum, showNum >= trendings.length - 1 ? 0 : showNum + 1);
        setTimeOut([...timeOut, setTimeout(() => {            
            setShowNum(showNum >= trendings.length - 1 ? 0 : showNum + 1);
        }, 5000)])
        
    }
    useEffect(() => {
        (async() => {
            await getTrendingDispatch(dayMode);
            
            setTimeOut([setTimeout(() => {            
                setShowNum(0);
            }, 100)]);

            // timeOut.forEach(timeId => {
            //     clearTimeout(timeId);
            // })

        })()


        
        
        
    }, []);
    useEffect(() => {
        
        if(prevDayMode !== undefined || prevDayMode !== dayMode){
            
            (async() => {
                
            
                await getTrendingDispatch(dayMode);
                setTimeOut([...timeOut, setTimeout(() => {            
                    setShowNum(0);
                })]);
    
            })()

        }


        
        
    }, [dayMode]);
    const showInfo = document.querySelectorAll('#trending .showInfo');
    const showPoster = document.querySelectorAll('#trending .poster')

    useEffect(() => {
        
        
        showInfo.forEach((element, i) => {

            //when the slidesho comes back from the start, the last show's transition would be none to fixed animation error
            if(showNum === 0){
                if(i === trendings.length - 1){
                    element.style.transition = '0s';
                }   
            //when user clicks previous button and reaches the end of the show, the transition of both first and last show would be none
            }else if(prevShowNum === 0 && showNum === trendings.length - 1){
                element.style.transition = '0s';

            }else{
                element.style.transition = '.5s';
            }


            //if the current show is being viewed, the opacitiy would be 1
            if(showNum === i){
                element.classList.remove('hideInfo');
            //this is to hide the elements for moving 
            }else{
                element.classList.add('hideInfo');
            }
            if(i <= showNum - 2){
                element.style.transform = `translateX(${100 * (showNum - 1) }%)`;
            }else{    
                element.style.transform = `translateX(${-100 * (showNum) }%)`;
            }
            
        });

        showPoster.forEach((element, i) => {
            if(showNum === 0){
                if(i === trendings.length - 1){
                    element.style.transition = '0s';
                }   
            //when user clicks previous button and reaches the end of the show, the transition of both first and last show would be none
            }else if(prevShowNum === 0 && showNum === trendings.length - 1){
                element.style.transition = '0s';

            }else{
                element.style.transition = '.5s';
            }


            //if the current show is being viewed, the opacitiy would be 1
            if(showNum === i){
                element.classList.remove('hidePoster');
            //this is to hide the elements for moving 
            }else{
                element.classList.add('hidePoster');
            }
            if(i <= showNum - 2){
                element.style.transform = `translateY(${100 * (showNum - 1) }%)`;
            }else{    
                element.style.transform = `translateY(${-100 * (showNum) }%)`;
            }

        })
        // console.log(prevShowNum !== undefined)
        if(prevShowNum !== undefined){
            setShowNumTimeout();

        }
 
        
    }, [showNum]);

    const changeShow = (val) => {

        const time = new Date().getTime();
        if(time > throttleTime ){
            setThrottleTime(time + 500);
            timeOut.forEach(timeId => {
                clearTimeout(timeId);
            })
            
            val = showNum + val
            setShowNum((prevState) => {
                if(val < prevState){
                    if(val <= -1){
                        return trendings.length - 1
                    }

                }
                return val >= trendings.length ? 0 : val;

            });
        }
    }

    const dayModeChange = (e) =>{
        const val = e.target.checked

        const time = new Date().getTime();
        if(time > throttleTime2 ){
            
            setThrottleTime2(time + 1000);
            [...showInfo, ...showPoster].forEach(element => {
                element.style.transition = '0.5s';

            })
            setDayMode(val ? 'week' : 'day')
        }
        
        
        
    }

    
    return (
        <div id='trending'>
            <div className='containerOpacity'></div>
            
            <section className='trendingContainer'> 
                <input checked={dayMode === 'day' ? false : true} onChange={dayModeChange} type='checkbox' id='media_type' name='media_type'/>
                <label htmlFor='media_type'>
                    
                    <p className='daySwitch'>Day</p>
                    <p className='weekSwitch'>Week</p>
                    <div className='circle'>

                    </div>

                </label>
                <i className='slideBtn fa fa-arrow-circle-left' onClick={() => changeShow(-1)}></i>
                <div className='showinfoContainer'>
                    {trendings.map((show, i) => (
                        <div key={i} className='showInfo'>
                            <ul className='genres'>
                                {show.genres && show.genres.map(genre => 
                                    <li style={{backgroundColor : colors[randomNumber(colors.length - 1)]}}>{genre}</li>

                                )}
                                
                        
                            </ul>
                            <h1>{show.name || show.title}</h1>
                            <ul className='buttons'>
                                {show.trailer && (
                                    <a href={show.trailer} target='_blank'><li>
                                        <i className='fa fa-play'></i>
                                        <p>Watch trailer</p>
                                    </li></a>

                                )}
                                

                                <li onClick={() => saveFromFavorites(show.id)}>
                                    <i className='fa fa-heart'></i>
                                    <p>Add To Favorites</p>
                                </li>
                            </ul>

                            <ul className='shortInfo'>
                                <li className='rating'>{show.vote_average}/10</li>
                                <li>Vote Count: {show.vote_count}</li>
                                <li>{show.media_type === 'tv' ? `First Air: ${show.first_air_date}` : `Release Date: ${show.release_date}`}</li>
                            </ul>
                            <Link to={`/details/${show.id}`} className='moreDetails'>More Details</Link>

                        </div>
                    ))}
                </div>
                <div className='showPosterContainer'>
                    {trendings.map(show => (
                        <div className='poster'>
                            <img src={`http://image.tmdb.org/t/p/w500/${show.poster_path}`} />
                        </div>
                        
                    ))}

                </div>
                <i className='slideBtn fa fa-arrow-circle-right' onClick={() => changeShow(1)}></i>
            </section>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        trendings : state.trendings
    }
};
const mapDispatchToProps = dispatch => {
    return {
        getTrendingDispatch : (dayMode) => dispatch(getTrendingAction(dayMode))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Trending)
