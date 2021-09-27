import axios from "axios"
import { SET_DETAILS, SET_DETAILS_EMPTY } from "../type";

export const setDetailsAction = (id, movie_type) => {
    return async(dispatch) => {
        try {
            const request = await axios.get(`https://api.themoviedb.org/3/${movie_type}/${id}?api_key=2effcb37ac7b1550616d653eea9cb4d6&language=en-US`);
            const data = request.data;
            console.log(data);
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