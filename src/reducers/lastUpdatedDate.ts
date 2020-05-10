import { keyBy } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';

import { ThunkActionType, DispatchType } from '../store';
import LastUpdatedDateService from '../services/lastUpdatedDate';

const lastUpdatedDateSlice = createSlice({
    name: 'lastUpdatedDate',
    initialState: {},
    reducers: {
        updateLastUpdatedDateSuccess: (state, { payload }) => {
            return payload
        },
    },
});

export const {
    updateLastUpdatedDateSuccess,
} = lastUpdatedDateSlice.actions;

export default lastUpdatedDateSlice.reducer;

export const getLastUpdatedDate = (): ThunkActionType => async (
    dispatch: DispatchType
) => {
    const response = await LastUpdatedDateService.getLastUpdatedDate();
    dispatch(updateLastUpdatedDateSuccess(response.data));
};

export const updateLastUpdatedDate = (data: any): ThunkActionType => async (
    dispatch: DispatchType
) => {
    console.log(33, data)
    const response = await LastUpdatedDateService.updateLastUpdatedDate(data);
    dispatch(updateLastUpdatedDateSuccess(response.data));
};


