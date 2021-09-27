import { combineReducers } from "redux"
import genreReducer from "./genreReducer"
import trendingReducer from "./trendingReducer"

const rootReducer = combineReducers({
    trendings : trendingReducer,
    genres : genreReducer

})
export default rootReducer