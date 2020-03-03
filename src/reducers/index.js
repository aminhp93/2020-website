import { combineReducers } from "redux";
import stock from './stock';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

const rootReducer = combineReducers({
    stock,
    todos,
    visibilityFilter,
})

export default rootReducer