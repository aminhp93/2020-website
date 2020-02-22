import React from 'react';
import axios from 'axios';

export default class Technical extends React.Component {
    componentDidMount() {
        axios({
            method: 'get',
            url: 'https://svr1.fireant.vn/api/Data/Technical/PivotPoints'
        })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.log(error))

        axios({
            method: 'get',
            url: 'https://svr1.fireant.vn/api/Data/Technical/TechnicalIndicators'
        })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.log(error))

        axios({
            method: 'get',
            url: 'https://svr1.fireant.vn/api/Data/Technical/MovingAverages'
        })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.log(error))

    }
    render() {
        return <div>Technical</div>
    }
}