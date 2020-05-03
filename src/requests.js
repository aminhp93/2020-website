import axios from 'axios';

import {
    getConfigGetCreateUrl,
    getMarketTradingStatistic
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