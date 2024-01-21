import { combineReducers } from "redux";
import Counter from "./demo";

const rootReducers = combineReducers({
    data :Counter
})

export default rootReducers;