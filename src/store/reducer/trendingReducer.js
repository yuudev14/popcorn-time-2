import { SET_TRENDING } from "../type";

const initState = [];

const trendingReducer = (state = initState, action) => {
    switch(action.type){
        case SET_TRENDING:
            return action.data
        default:
            return state
    }
}

export default trendingReducer