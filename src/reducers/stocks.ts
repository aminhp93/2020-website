import { keyBy } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';

import { ThunkActionType } from '../store';
import StockService from '../services/stock';

const stocksSlice = createSlice({
    name: 'stocks',
    initialState: {},
    reducers: {
        fetchListStocksSuccess: (state, { payload }) => {
            return { ...state, ...payload };
        },
    },
});

export const {
    fetchListStocksSuccess,
} = stocksSlice.actions;

export default stocksSlice.reducer;

export const fetchListStocks = (): ThunkActionType => async (
    dispatch
) => {
    const response = await StockService.getListStocks();
    const data = keyBy(response.data, 'Symbol');
    dispatch(fetchListStocksSuccess(data));
};

export const fetchNews = (data): ThunkActionType => async (
    dispatch
) => {
    const { type, group, startIndex, count } = data;
    console.log(data)
    const response = await StockService.fetchNews(type, group, startIndex, count);
    return response
}

export const getYearlyFinancialInfo = (): ThunkActionType => async (
    dispatch,
    getStoreValue
) => {
    const { selectedSymbol } = getStoreValue();
    const response = await StockService.getYearlyFinancialInfo(selectedSymbol)
    return response
}

export const getQuarterlyFinancialInfo = (): ThunkActionType => async (
    dispatch,
    getStoreValue
) => {
    const { selectedSymbol } = getStoreValue();
    const response = await StockService.getQuarterlyFinancialInfo(selectedSymbol)
    return response
}

export const getLastestFinancialInfo = (): ThunkActionType => async (
    dispatch,
    getStoreValue
) => {
    const { selectedSymbol } = getStoreValue();
    const response = await StockService.getLastestFinancialInfo(selectedSymbol)
    return response
}

export const getLastestFinancialReports = (data: any): ThunkActionType => async (
    dispatch,
    getStoreValue
) => {
    const { selectedSymbol } = getStoreValue();
    const { financialType, year, quarter } = data;
    const response = await StockService.getLastestFinancialReports(selectedSymbol, financialType, year, quarter)
    return response
}