import React, {useEffect, useRef} from 'react';
import sample from '../assets/sampleCover.jpg';
import sample2 from '../assets/sample.jpg';
import '../styles/details/details.scss';

const Details = () => {
    const backgroundRef = useRef();
    useEffect(() => {

    }, [])

    return (
        <div id='details'>
            <section id='detailHeader'>
                

                <img className='backgroundImg' src={sample} />
                <div className='background'></div>
                <div className='showTitle'>
                    <img src={sample2} />
                    <h1>Avengers</h1>
                    <ul>
                        <li>Adventures</li>
                        <li>Action</li>
                        <li>romance</li>
                    </ul>
                </div>
                <div className='headerInfo'>
                    
                    <div className='rating'>
                        <i className='fa fa-star'></i>
                        <p>9.7/10</p>
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
                        <p>Sint irure ullamco ex anim pariatur. Pariatur proident cillum cillum aliquip aliqua. Velit et quis nisi et pariatur ex irure incididunt in reprehenderit.</p>
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
            
            
        </div>
    )
}

export default Details
