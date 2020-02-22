import React from 'react';
import axios from 'axios';

export default class Financial extends React.Component {
    componentDidMount() {
        axios({
            method: 'get',
            url: 'https://svr1.fireant.vn/api/Data/Finance/YearlyFinancialInfo?symbol=FPT&fromYear=2016&toYear=2019'
        })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.log(error))

        axios({
            method: 'get',
            url: 'https://svr1.fireant.vn/api/Data/Finance/QuarterlyFinancialInfo?symbol=FPT&fromYear=2016&fromQuarter=1&toYear=2019&toQuarter=4'
        })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.log(error))


        axios({
            method: 'get',
            url: 'https://svr1.fireant.vn/api/Data/Finance/LastestFinancialReports?symbol=FPT&type=2&year=2020&quarter=0&count=5'
        })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.log(error))
    }

    render() {
        return <div>Financial</div>
    }
}