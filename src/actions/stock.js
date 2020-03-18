import { StockAction } from '../constants/action';

export const setSymbol = (data) => ({
    type: StockAction.SET_SYMBOL,
    payload: data
})

export const setAllStocks = (data) => ({
    type: StockAction.SET_ALL_STOCKS,
    payload: data
})
