import { combineReducers } from "redux";

import stocks from './stocks';
import selectedSymbol from './selectedSymbol';
import lastUpdatedDate from './lastUpdatedDate';

const rootReducer = combineReducers({
    stocks,
    selectedSymbol,
    lastUpdatedDate
})

export default rootReducer