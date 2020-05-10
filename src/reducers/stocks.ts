import { keyBy } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';

import { ThunkActionType, DispatchType } from '../store';
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
    dispatch: DispatchType
) => {
    const response = await StockService.getListStocks();
    const data = keyBy(response.data, 'Symbol');
    dispatch(fetchListStocksSuccess(data));
};

