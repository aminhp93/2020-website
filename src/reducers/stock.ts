import { keyBy } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';

import { ThunkActionType, DispatchType } from '../store';
// import NotificationService from 'services/Notification';

const allStocksObjSlice = createSlice({
    name: 'allStocksObj',
    initialState: {},
    reducers: {
        // fetchTeamNotitficationsSuccess: (state, { payload }) => {
        //   return { ...state, ...payload };
        // },
    },
});

export const {
    //   fetchTeamNotitficationsSuccess,
} = allStocksObjSlice.actions;

export default allStocksObjSlice.reducer;

export const fetchTeamNotifications = (): ThunkActionType => async (
    dispatch: DispatchType
) => {
    //   const response = await NotificationService.getTeamsNotifications();
    //   const data = keyBy(response.data, 'team');
    //   dispatch(fetchTeamNotitficationsSuccess(data));
};
