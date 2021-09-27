import axios from "axios";
import { SET_TRENDING } from "../type";
export const getTrendingAction = (dayMode, genres) => {
    return async(dispatch)=> {
        try {
            const trendingRequest = await axios.get(`https://api.themoviedb.org/3/trending/all/${dayMode}?api_key=2effcb37ac7b1550616d653eea9cb4d6`);
            let data = trendingRequest.data.results.filter(data => data.media_type !== 'person');
            const dataPromises = data.map(show => axios.get(`https://api.themoviedb.org/3/${show.media_type}/${show.id}/videos?api_key=2effcb37ac7b1550616d653eea9cb4d6&language=en-US`));
            const responses = await Promise.all(dataPromises);
            const dataResults = responses.map((response, index) => {
                const show = data[index];
                const trailer = response.data.results[0];
                if(trailer !== undefined){
                    show.trailer = `https://www.youtube.com/watch?v=${trailer.key}`
                }
                show.genres = show.genre_ids.map(genreId => genres[genres.findIndex(genre => genre.id === genreId)].name)
                return show; 
                
            });
            dispatch({
                type : SET_TRENDING,
                data : dataResults
            });
            return
            
        } catch (error) {
            console.log(error);
            
        }
        
    }
}