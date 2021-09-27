import { combineReducers } from "redux"
import genreReducer from "./genreReducer"
import trendingReducer from "./trendingReducer"
import detailReducer from "./detailReducer"

const rootReducer = combineReducers({
    trendings : trendingReducer,
    genres : genreReducer,
    details : detailReducer,

})
export default rootReducer