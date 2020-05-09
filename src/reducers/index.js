import { combineReducers } from "redux";
import stock from './stock.ts';


const rootReducer = combineReducers({
    stock,
})

export default rootReducer