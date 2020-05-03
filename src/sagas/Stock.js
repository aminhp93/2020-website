
import { fork, put, call, takeLatest } from 'redux-saga/effects';
import {
    getLastUpdatedDateRequest,
    getMarketTradingStatisticRequest
} from '../requests'

import { StockAction } from '../constants/action';
import {
    getLastUpdatedDateSuccess,
    getMarketTradingStatisticRequestSuccess
} from '../actions/stock'

function* getLastUpdatedDate() {
    const res = yield call(getLastUpdatedDateRequest)
    yield put(getLastUpdatedDateSuccess(res.data.value))
}

function* getMarketTradingStatistic() {
    const res = yield call(getMarketTradingStatisticRequest)
    yield put(getMarketTradingStatisticRequestSuccess(res))
}

function* root() {
    yield takeLatest(StockAction.GET_LAST_UPDATED_DATE_REQUEST, getLastUpdatedDate);
    yield takeLatest(StockAction.GET_MARKET_TRADING_STATISTIC_REQUEST, getMarketTradingStatistic);
}

export default root