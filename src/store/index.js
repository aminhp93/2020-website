import { createStore } from 'redux';

import rootReducer from '../reducers/index.js';

export const configureStore = (preloadedState) => {
    const store = createStore(
        rootReducer,
        preloadedState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    );

    return store;
};