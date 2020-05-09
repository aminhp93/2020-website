import axios from 'axios';

import {
    getConfigGetCreateUrl,
    getMarketTradingStatistic,
    getHistoricalQuotesUrl
} from './urls'


export function getLastUpdatedDateRequest() {
    return axios({
        url: getConfigGetCreateUrl('LAST_UPDATED_HISTORICAL_QUOTES'),
        method: 'get'
    })
}

export function getMarketTradingStatisticRequest() {
    return axios({
        url: getMarketTradingStatistic(),
        method: 'get'
    })
}

export function getHistoricalQuotesRequest(symbol, startDate, endDate) {
    return axios({
        url: getHistoricalQuotesUrl(symbol, startDate, endDate),
        method: 'get'
    })
}