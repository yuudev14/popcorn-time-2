import { combineReducers } from "redux"
import trendingReducer from "./trendingReducer"

const rootReducer = combineReducers({
    trendings : trendingReducer

})
export default rootReducer