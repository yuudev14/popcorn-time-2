import React from 'react'
import ShowSection from '../components/home/showSection';
import Trending from '../components/home/trending';
import '../styles/home/home.scss';

const Home = () => {
    return (
        <div id='homePage'>
            <Trending />
            <ShowSection type='Upcoming' mediaType='movie'/>
            <ShowSection type='Now Playing' mediaType='movie'/>
            <ShowSection type='Airing Today' mediaType='tv'/>
            <ShowSection type='On The Air' mediaType='tv'/>
        </div>
    )
}

export default Home
