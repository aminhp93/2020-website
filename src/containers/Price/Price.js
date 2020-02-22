import React from 'react';
import axios from 'axios';

export default class Price extends React.Component {
    componentDidMount() {
        axios({
            method: 'get',
            url: 'https://svr1.fireant.vn/api/Data/Companies/HistoricalQuotes?symbol=FPT&startDate=2020-1-22&endDate=2020-2-22'
        })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.log(error))
    }

    render() {
        return <div>Price</div>
    }
}