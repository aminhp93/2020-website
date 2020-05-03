import { StockAction } from '../constants/action';

export const setSymbol = (data) => ({
    type: StockAction.SET_SYMBOL,
    payload: data
})

export const setAllStocks = (data) => ({
    type: StockAction.SET_ALL_STOCKS,
    payload: data
})

export const setLastUpdatedDate = (data) => ({
    type: StockAction.SET_LAST_UPDATED_DATE,
    payload: data
})

export const getLastUpdatedDateRequest = () => ({
    type: StockAction.GET_LAST_UPDATED_DATE_REQUEST,
})

export const getLastUpdatedDateSuccess = () => ({
    type: StockAction.GET_LAST_UPDATED_DATE_REQUEST_SUCCEESS,
})

export const getMarketTradingStatisticRequest = () => ({
    type: StockAction.GET_MARKET_TRADING_STATISTIC_REQUEST,
})

export const getMarketTradingStatisticRequestSuccess = () => ({
    type: StockAction.GET_MARKET_TRADING_STATISTIC_REQUEST_SUCCEESS,
})