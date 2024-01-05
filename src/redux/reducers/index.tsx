import { combineReducers } from "redux";
import counterReducer from "./counter.tsx";
import loggedReducer from "./isLogged.tsx";

const allReducers = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer
})

export default allReducers;