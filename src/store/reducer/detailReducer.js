import { SET_DETAILS, SET_DETAILS_EMPTY } from "../type";

const initState = {};

const detailReducer = (state = initState, action) => {
    switch(action.type){
        case SET_DETAILS:
            return action.data;
        case SET_DETAILS_EMPTY:
            return {}
        default:
            return state
    }
}

export default detailReducer;
