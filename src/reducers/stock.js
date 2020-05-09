import { StockAction } from '../constants/action';

export const INITIAL_STATE = {
    SelectedSymbol: '',
    AllStocksObj: {},
    LastUpdatedDate: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case StockAction.SET_SYMBOL:
            return {
                ...state,
                SelectedSymbol: action.payload
            }
        case StockAction.SET_LAST_UPDATED_DATE:
            return {
                ...state,
                LastUpdatedDate: action.payload
            }
        case StockAction.GET_MARKET_TRADING_STATISTIC_SUCCESS:
            return {
                ...state,
                AllStocksObj: action.payload
            }
        case StockAction.GET_LAST_UPDATED_DATE_SUCCESS:
            return {
                ...state,
                LastUpdatedDate: action.payload
            }
        default:
            return state;
    }
}