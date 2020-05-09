
import { fork, put, call, takeLatest, select } from 'redux-saga/effects';
import { keyBy } from 'lodash';

import {
    getLastUpdatedDateRequest,
    getMarketTradingStatisticRequest,
    getHistoricalQuotesRequest
} from '../requests'

import { StockAction } from '../constants/action';
import {
    getLastUpdatedDateSuccessAction,
    getMarketTradingStatisticRequestSuccessAction,
} from '../actions/stock';
import { getSelectedSymbol } from '../selectors/Stock'


function* getLastUpdatedDate() {
    const res = yield call(getLastUpdatedDateRequest)
    yield put(getLastUpdatedDateSuccessAction(res.data.value))
}

function* getMarketTradingStatistic() {
    const res = yield call(getMarketTradingStatisticRequest)
    const mappedRes = keyBy(res.data, 'Symbol')
    yield put(getMarketTradingStatisticRequestSuccessAction(mappedRes))
}

function* getHistoricalQuotes(data) {
    const { startDate, endDate } = data.payload;
    const SelectedSymbol = yield select(getSelectedSymbol)
    if (!SelectedSymbol || !startDate || !endDate) return;
    const res = yield call(getHistoricalQuotesRequest, SelectedSymbol, startDate, endDate)
    console.log(34, res)
    return res
}

function* root() {
    yield takeLatest(StockAction.GET_HISTORICAL_QUOTES, getHistoricalQuotes)
    yield takeLatest(StockAction.GET_LAST_UPDATED_DATE, getLastUpdatedDate);
    yield takeLatest(StockAction.GET_MARKET_TRADING_STATISTIC, getMarketTradingStatistic);
}

export default root