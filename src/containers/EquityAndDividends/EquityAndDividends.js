import React from 'react';
import axios from 'axios';

export default class EquityAndDividends extends React.Component {
    componentDidMount() {
        axios({
            method: 'get',
            url: 'https://svr1.fireant.vn/api/Data/Companies/EquityAndDividends?symbol=FPT&count=5'
        })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.log(error))
    }

    render() {
        return <div>EquityAndDividends</div>
    }
}