import { StockAction } from '../constants/action';

export const INITIAL_STATE = {
    Symbol: '',
    AllStocks: [],
    AllStocksObj: {}
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case StockAction.SET_SYMBOL:
            return {
                ...state,
                Symbol: action.payload
            }
        case StockAction.SET_ALL_STOCKS:
            let result = {};
            action.payload.map(item => {
                result[item.id] = item
            })
            return {
                ...state,
                AllStocks: action.payload,
                AllStocksObj: result
            }
        default:
            return state;
    }
}