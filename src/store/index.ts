import { Action, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'

import rootReducer from '../reducers'

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    })
})

// @ts-ignore
if (module.hot) {
    // @ts-ignore
    module.hot.accept('reducers', () => {
        const newRootReducer = require('reducers').default
        store.replaceReducer(newRootReducer)
    })
}

export const dispatch = store.dispatch.bind(store)

export type DispatchType = typeof store.dispatch

export type RootStateType = ReturnType<typeof rootReducer>

export type ThunkActionType = ThunkAction<void, RootStateType, unknown, Action<string>>

export default store
