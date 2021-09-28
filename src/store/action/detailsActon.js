import axios from "axios"
import { SET_DETAILS, SET_DETAILS_EMPTY } from "../type";

export const setDetailsAction = (id, movie_type) => {
    return async(dispatch) => {
        try {
            const request = await axios.get(`https://api.themoviedb.org/3/${movie_type}/${id}?api_key=2effcb37ac7b1550616d653eea9cb4d6&language=en-US`);
            const data = request.data;
            const reviewRequest = await axios.get(`https://api.themoviedb.org/3/${movie_type}/${id}/reviews?api_key=2effcb37ac7b1550616d653eea9cb4d6&language=en-US&page=1`);
            const videoRequest = await axios.get(`https://api.themoviedb.org/3/${movie_type}/${id}/videos?api_key=2effcb37ac7b1550616d653eea9cb4d6&language=en-US`);
            data.reviews = reviewRequest.data.results;
            data.videos = videoRequest.data.results;
            dispatch({
                type: SET_DETAILS,
                data
            })
            
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const setEmptyDetailAction = () => {
    return {
        type : SET_DETAILS_EMPTY,
    }
}