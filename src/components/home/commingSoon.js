import React, { useEffect, useState } from 'react'
import { randomNumber } from '../../methods/method';

const CommingSoon = () => {
    const [showNum, setShowNum] = useState(0);
    const [timeOut, setTimeOut] = useState();

    const colors = ['#62bccc', '#337ac0', '#ee9323', '#F2b922']

    const setShowNumTimeout = () => {
        setTimeOut(setTimeout(() => {
            setShowNum(showNum === 4 ? 1 : showNum + 1);
        }, 5000))
        
    }
    // useEffect(() => {
    //     setShowNumTimeout()
    // }, []);

    // useEffect(() => {
    //     document.querySelectorAll('.showInfo').forEach(element => {
    //         element.style.transition = showNum >= 4 || showNum === 0 ? 'none' : '.5s'
    //         element.style.transform = `translateX(${-100 * (showNum >= 4 ? 0 : showNum) }%)`;
    //     });
    //     setShowNumTimeout();
    // }, [showNum]);

    const changeShow = (val) => {
        clearTimeout(timeOut);
        setTimeOut();
        val = showNum + val
        setShowNum(val >= 4 ? 0 : val <= 0 ? 4 : val )
    }
    return (
        <div id='commingSoon'>
            <div className='containerOpacity'></div>
            <section className='commingSoonContainer'> 
                <button className='slideBtn prev' onClick={() => changeShow(-1)}>prev</button>
                

                <div className='showinfoContainer'>
                    <div className='showInfo'>
                        <ul className='genres'>
                        <li style={{backgroundColor : colors[randomNumber(colors.length - 1)]}}>Action</li>
                            <li style={{backgroundColor : colors[randomNumber(colors.length - 1)]}}>drama</li>

                        </ul>
                        <h1>Guardians of the galaxy</h1>
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

                    <div className='showInfo'>
                        <ul className='genres'>
                            <li style={{backgroundColor : colors[randomNumber(colors.length)]}}>Action</li>
                            <li style={{backgroundColor : colors[randomNumber(colors.length)]}}>drama</li>

                        </ul>
                        <h1>TITLE name2</h1>
                        <button>watch trailer</button>

                    </div>

                    <div className='showInfo'>
                        <ul className='genres'>
                            <li>Action</li>
                            <li>drama</li>

                        </ul>
                        <h1>TITLE name3</h1>
                        <button>watch trailer</button>

                    </div>

                    <div className='showInfo'>
                        <ul className='genres'>
                            <li>Action</li>
                            <li>drama</li>

                        </ul>
                        <h1>TITLE name4</h1>
                        <button>watch trailer</button>

                    </div>
                </div>
                <div className='showPosterContainer'>

                </div>
                <button className='slideBtn next' onClick={() => changeShow(1)}>next</button>

            </section>
            
            
        </div>
    )
}

export default CommingSoon
