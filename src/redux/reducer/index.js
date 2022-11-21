import { combineReducers } from "redux";
import movieReducer from './movieReducer';
import mainReducer from './mainReducer';

export default combineReducers({
    movie: movieReducer,
    main : mainReducer,
})