import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { Action, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'
import rootReducer from './reducers/index.js'

// import store from './store/index';
const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    })
})

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

