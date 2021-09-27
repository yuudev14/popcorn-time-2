import { SET_GENRES } from "../type";

const initState = [];

const genreReducer = (state = initState, action) => {
    switch(action.type){
        case SET_GENRES:
            return action.data;
        default:
            return state;
    }
}

export default genreReducer