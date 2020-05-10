import { combineReducers } from "redux";

import stocks from './stocks';
import selectedSymbol from './selectedSymbol';
import lastUdpatedDate from './lastUdpatedDate';

const rootReducer = combineReducers({
    stocks,
    selectedSymbol,
    lastUdpatedDate
})

export default rootReducer