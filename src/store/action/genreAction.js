import axios from 'axios';
import { SET_GENRES } from '../type';

export const getGenreAction = () => {
    return async(dispatch) => {
        try {
            let genres = [];
            const movieGenre = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=2effcb37ac7b1550616d653eea9cb4d6&language=en-US`);
            const tvGenre = await axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=2effcb37ac7b1550616d653eea9cb4d6&language=en-US`);
            genres = [...movieGenre.data.genres, ...tvGenre.data.genres];
            dispatch({
                type : SET_GENRES,
                data : genres,
            })
            
        } catch (error) {
            console.log(error);
            
        }
    }
}