import React, { useEffect, useState} from 'react';
import {usePrevious} from 'react-use';
import { randomNumber } from '../../methods/method';
import sampleCover from '../../assets/sample.jpg';
import axios from 'axios';

const CommingSoon = () => {
    const [showNum, setShowNum] = useState();
    const [timeOut, setTimeOut] = useState();
    const prevShowNum = usePrevious(showNum);
    const [throttleTime, setThrottleTime] = useState(0);
    const [commingSoon, setCommingSoon] = useState([])

    const colors = ['#62bccc', '#337ac0', '#ee9323', '#F2b922']

    const setShowNumTimeout = () => {
        setTimeOut(setTimeout(() => {            
            setShowNum(showNum >= commingSoon.length - 1 ? 0 : showNum + 1);
        }, 5000))
        
    }
    useEffect(() => {
        
        (async() => {
            try {
                const commingSoonRequest = await axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=2effcb37ac7b1550616d653eea9cb4d6');

                const data = commingSoonRequest.data.results.filter(data => data.media_type !== 'person');
                console.log(data);

                setCommingSoon(data);
                setTimeOut(setTimeout(() => {            
                    setShowNum(0);
                }))
            
                
            } catch (error) {
                console.log(error);
                
            }

        } )();
        
        
    }, []);
    const showInfo = document.querySelectorAll('#commingSoon .showInfo');
    const showPoster = document.querySelectorAll('#commingSoon .poster')

    useEffect(() => {
        showInfo.forEach((element, i) => {

            //when the slidesho comes back from the start, the last show's transition would be none to fixed animation error
            if(showNum === 0){
                if(i === commingSoon.length - 1){
                    element.style.transition = '0s';
                }   
            //when user clicks previous button and reaches the end of the show, the transition of both first and last show would be none
            }else if(prevShowNum === 0 && showNum === commingSoon.length - 1){
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
                if(i === commingSoon.length - 1){
                    element.style.transition = '0s';
                }   
            //when user clicks previous button and reaches the end of the show, the transition of both first and last show would be none
            }else if(prevShowNum === 0 && showNum === commingSoon.length - 1){
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

        setShowNumTimeout();
        
        
        
    }, [showNum]);

    const changeShow = (val) => {
        clearTimeout();

        const time = new Date().getTime();
        if(time > throttleTime ){
            console.log(true);
            setThrottleTime(time + 500);
            clearTimeout(timeOut);
            setTimeOut();
            val = showNum + val
            setShowNum((prevState) => {
                if(val < prevState){
                    if(val <= -1){
                        return commingSoon.length - 1
                    }

                }
                return val >= commingSoon.length ? 0 : val;

            });
        }
    }
    return (
        <div id='commingSoon'>
            <div className='containerOpacity'></div>
            <section className='commingSoonContainer'> 
                <i className='slideBtn fa fa-arrow-circle-left' onClick={() => changeShow(-1)}></i>
                <div className='showinfoContainer'>
                    {commingSoon.map((item, i) => (
                        <div className='showInfo'>
                        <ul className='genres'>
                        <li style={{backgroundColor : colors[randomNumber(colors.length - 1)]}}>Action</li>
                            <li style={{backgroundColor : colors[randomNumber(colors.length - 1)]}}>drama</li>
                        </ul>
                        <h1>Guardians of the galaxy{i}</h1>
                        <ul className='buttons'>
                            <li>
                                <i className='fa fa-play'></i>
                                <p>Watch trailer</p>
                            </li>

                            <li>
                                <i className='fa fa-heart'></i>
                                <p>Add To Favorites</p>
                            </li>
                        </ul>

                        <ul className='shortInfo'>
                            <li className='rating'>10/10</li>
                            <li>Run Time: </li>
                            <li>Release Date: May 1 2015</li>
                        </ul>
                        <button className='moreDetails'>More Details</button>

                    </div>
                    ))}
                </div>
                <div className='showPosterContainer'>
                    {commingSoon.map(show => (
                        <div className='poster'>
                            <img src={sampleCover} />
                        </div>
                        
                    ))}

                </div>
                <i className='slideBtn fa fa-arrow-circle-right' onClick={() => changeShow(1)}></i>
            </section>

        </div>
    )
}

export default CommingSoon
