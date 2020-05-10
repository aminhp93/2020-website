import { keyBy } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';

import { ThunkActionType, DispatchType } from '../store';
import LastUpdatedDateService from '../services/lastUpdatedDate';

const stocksSlice = createSlice({
    name: 'lastUpdatedDate',
    initialState: '',
    reducers: {
        udpateLastUpdatedDateSuccess: (state, { payload }) => {
            return payload
        },
    },
});

export const {
    udpateLastUpdatedDateSuccess,
} = stocksSlice.actions;

export default stocksSlice.reducer;

export const getLastUpdatedDate = (): ThunkActionType => async (
    dispatch: DispatchType
) => {
    const response = await LastUpdatedDateService.getLastUpdatedDate();
    dispatch(udpateLastUpdatedDateSuccess(response.data.value));
};

export const udpateLastUpdatedDate = (data: any): ThunkActionType => async (
    dispatch: DispatchType
) => {
    const response = await LastUpdatedDateService.updateLastUpdatedDate(data);
    dispatch(udpateLastUpdatedDateSuccess(response.data.value));
};


