import React from 'react';
import axios from 'axios';

export default class Profile extends React.Component {
    componentDidMount() {
        axios({
            method: 'get',
            url: 'https://svr3.fireant.vn/api/Data/Companies/CompanyInfo?symbol=FPT'
        })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.log(error))

        axios({
            method: 'get',
            url: 'https://svr3.fireant.vn/api/Data/Finance/LastestFinancialInfo?symbol=FPT'
        })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.log(error))

        axios({
            method: 'get',
            url: 'https://svr3.fireant.vn/api/Data/Companies/SubCompanies?symbol=FPT'
        })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.log(error))

        axios({
            method: 'get',
            url: 'https://svr3.fireant.vn/api/Data/Companies/CompanyOfficers?symbol=FPT'
        })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.log(error))


        axios({
            method: 'get',
            url: 'https://svr3.fireant.vn/api/Data/Companies/CompanyTransactions?symbol=FPT'
        })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.log(error))
    }

    render() {
        return <div>
            Profile
            <div>Click to update data</div>
            <div>Last updated at</div>
        </div>
    }
}