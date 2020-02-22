import React from 'react';
import axios from 'axios';

export default class News extends React.Component {
    componentDidMount() {
        axios({
            method: 'get',
            url: 'https://svr1.fireant.vn/api/Data/News/CompanyNewsCount?symbol=FPT'
        })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.log(error))

        axios({
            method: 'get',
            url: 'https://svr1.fireant.vn/api/Data/News/CompanyNews?symbol=FPT&startIndex=0&count=10'
        })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.log(error))
    }

    render() {
        return <div>News</div>
    }
}