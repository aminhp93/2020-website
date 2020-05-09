import { StockAction } from '../constants/action';

export const setSymbolAction = (data) => ({
    type: StockAction.SET_SYMBOL,
    payload: data
})

export const setLastUpdatedDateAction = (data) => ({
    type: StockAction.SET_LAST_UPDATED_DATE,
    payload: data
})

export const getLastUpdatedDateAction = (data) => ({
    type: StockAction.GET_LAST_UPDATED_DATE,
    payload: data
})

export const getLastUpdatedDateSuccessAction = (data) => ({
    type: StockAction.GET_LAST_UPDATED_DATE_SUCCESS,
    payload: data
})

export const getMarketTradingStatisticAction = (data) => ({
    type: StockAction.GET_MARKET_TRADING_STATISTIC,
    payload: data
})

export const getMarketTradingStatisticRequestSuccessAction = (data) => ({
    type: StockAction.GET_MARKET_TRADING_STATISTIC_SUCCESS,
    payload: data
})

export const getHistoricalQuotesAction = (data) => ({
    type: StockAction.GET_HISTORICAL_QUOTES,
    payload: data
})