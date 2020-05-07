import { combineReducers } from "redux";

import stock from './stock';
import modal from './modal';

const rootReducer = combineReducers({
    stock,
    modal
})

export default rootReducer