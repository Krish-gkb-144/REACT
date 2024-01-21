import { combineReducers } from "redux";
import Counter from "./counterReducer";
import Crud from "./crudReducer";

const rootReducers = combineReducers({
    Counter,
    crud : Crud

})

export default rootReducers;