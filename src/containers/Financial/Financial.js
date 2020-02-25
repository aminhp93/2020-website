import React from 'react';
import axios from 'axios';
import {
    getYearlyFinancialInfoUrl,
    getQuarterlyFinancialInfoUrl,
    getLastestFinancialReportsUrl,
} from '../../request';

export default class Financial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            YearlyFinancialInfoArray: [],
            QuarterlyFinancialInfoArray: [],
            LastestFinancialReportsArray: [],
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: getYearlyFinancialInfoUrl()
        })
            .then(response => {
                if (response.data) {
                    this.setState({
                        YearlyFinancialInfoArray: response.data
                    })
                }
            })
            .catch(error => console.log(error))

        axios({
            method: 'get',
            url: getQuarterlyFinancialInfoUrl()
        })
            .then(response => {
                if (response.data) {
                    this.setState({
                        QuarterlyFinancialInfoArray: response.data
                    })
                }
            })
            .catch(error => console.log(error))


        axios({
            method: 'get',
            url: getLastestFinancialReportsUrl()
        })
            .then(response => {
                if (response.data) {
                    this.setState({
                        LastestFinancialReportsArray: response.data
                    })
                }
            })
            .catch(error => console.log(error))
    }

    render() {
        const {
            // YearlyFinancialInfoArray,
            // QuarterlyFinancialInfoArray,
            // LastestFinancialReportsArray,
        } = this.state;
        return (
            <div className="Financial">
                <div className="Financial-left-container">
                    <div className="Financial-revenue">
                        <div>
                            DOANH THU (TỶ)
                        </div>
                        <div>
                            DOANH THU (TỶ)
                        </div>
                    </div>
                    <div className="Financial-profit">
                        <div>
                            LỢI NHUẬN (TỶ)

                        </div>
                        <div>
                            LỢI NHUẬN (TỶ)

                        </div>
                    </div>
                </div>
                <div className="Financial-right-container">
                    <div>
                        CHỈ TIÊU TÀI CHÍNH
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        )
    }
}