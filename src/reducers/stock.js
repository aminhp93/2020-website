import { StockAction } from '../constants/action';

export const INITIAL_STATE = {
    Symbol: '',
    AllStocks: [],
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case StockAction.SET_SYMBOL:
            return {
                ...state,
                Symbol: action.payload
            }
        case StockAction.SET_ALL_STOCKS:
            return {
                ...state,
                AllStocks: action.payload
            }
        default:
            return state;
    }
}