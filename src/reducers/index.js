import { combineReducers } from "redux";

import stocks from './stocks';
import companies from './companies';
import selectedSymbol from './selectedSymbol';
import lastUpdatedDate from './lastUpdatedDate';

const rootReducer = combineReducers({
    stocks,
    companies,
    selectedSymbol,
    lastUpdatedDate
})

export default rootReducer