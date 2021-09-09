import axios from "axios";
import { SET_TRENDING } from "../type";
export const getTrendingAction = (dayMode) => {
    return async(dispatch)=> {
        let genres = [];
        const movieGenre = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=2effcb37ac7b1550616d653eea9cb4d6&language=en-US`);
        const tvGenre = await axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=2effcb37ac7b1550616d653eea9cb4d6&language=en-US`);
        genres = [...movieGenre.data.genres, ...tvGenre.data.genres]
        const trendingRequest = await axios.get(`https://api.themoviedb.org/3/trending/all/${dayMode}?api_key=2effcb37ac7b1550616d653eea9cb4d6`);
        let data = trendingRequest.data.results.filter(data => data.media_type !== 'person');
        data.forEach(async(show, index) => {
            try {
                const trailerRequest = await axios.get(`https://api.themoviedb.org/3/${show.media_type}/${show.id}/videos?api_key=2effcb37ac7b1550616d653eea9cb4d6&language=en-US`);
                const trailer = trailerRequest.data.results[0];
                if(trailer !== undefined){
                    show.trailer = `https://www.youtube.com/watch?v=${trailer.key}`
                }
                
                
                show.genres = show.genre_ids.map(genreId => genres[genres.findIndex(genre => genre.id === genreId)].name)
                data[index] = show
                if(index === data.length - 1){
                    dispatch({
                        type : SET_TRENDING,
                        data
                    });

                }
                
            } catch (error) {
                console.log(error);
                
            }
            
            
        });
        
        return
    }
}