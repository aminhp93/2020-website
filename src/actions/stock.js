import { StockAction } from '../constants/action';

export const setSymbol = (data) => ({
    type: StockAction.SET_SYMBOL,
    payload: data
})
