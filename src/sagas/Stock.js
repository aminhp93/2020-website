
import { fork } from 'redux-saga/effects';
import axios from 'axios';

import {
    getConfigGetCreateUrl
} from '../utils/request'


function getLastUpdatedDate() {
    axios({
        url: getConfigGetCreateUrl('LAST_UPDATED_HISTORICAL_QUOTES'),
        method: 'get'
    })
        .then(response => {
            console.log(response, 16)
            if (response.data) {
                // this.props.setLastUpdatedDate(response.data.value)
            }
        })
        .catch(error => {
            console.log(error)
        })
}

export default function* root() {
    yield fork(getLastUpdatedDate)
}