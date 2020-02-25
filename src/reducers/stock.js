import { StockAction } from '../constants/action';

export const INITIAL_STATE = {
    Symbol: '',
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case StockAction.SET_SYMBOL:
            console.log(action)
            return {
                ...state,
                Symbol: action.payload
            }
        default:
            return state;
    }
}