import React from 'react';
import axios from 'axios';

export default class Stakeholder extends React.Component {
    componentDidMount() {
        axios({
            method: 'get',
            url: 'https://svr1.fireant.vn/api/Data/Companies/MajorHolders?symbol=FPT'
        })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.log(error))

        axios({
            method: 'get',
            url: 'https://svr1.fireant.vn/api/Data/Companies/MajorHolderTransactions?symbol=FPT&startIndex=0&count=1000'
        })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.log(error))

        axios({
            method: 'get',
            url: 'https://svr1.fireant.vn/api/Data/Companies/MajorHolderTransactionsRange?symbol=FPT&startDate=2019-10-21&endDate=2037-1-1'
        })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.log(error))
    }

    render() {
        return <div>Stakeholder</div>
    }
}