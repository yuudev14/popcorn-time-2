import { SET_DETAILS } from "../type";

const initState = {};

const detailReducer = (state = initState, action) => {
    switch(action.type){
        case SET_DETAILS:
            return action.data
        default:
            return state
    }
}

export default detailReducer;
