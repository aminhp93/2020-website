import { StockAction } from '../constants/action';

export const INITIAL_STATE = {
    Symbol: '',
    AllStocks: [],
    AllStocksObj: {},
    LastUpdatedDate: ''
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
        case StockAction.SET_LAST_UPDATED_DATE:
            return {
                ...state,
                LastUpdatedDate: action.payload
            }
        default:
            return state;
    }
}