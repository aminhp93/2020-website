import { keyBy } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';

const selectedSymbolSlice = createSlice({
    name: 'selectedSymbol',
    initialState: 'VNM',
    reducers: {
        updateSelectedSymbolSuccess: (state, { payload }) => {
            return payload
        },
    },
});

export const {
    updateSelectedSymbolSuccess,
} = selectedSymbolSlice.actions;

export default selectedSymbolSlice.reducer;

