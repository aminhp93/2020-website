import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import {
    getYearlyFinancialInfoUrl,
    getQuarterlyFinancialInfoUrl,
    getLastestFinancialReportsUrl,
} from '../../request';

class Financial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            YearlyFinancialInfoArray: [],
            QuarterlyFinancialInfoArray: [],
            LastestFinancialReportsArray: [],
        }
    }

    componentDidMount() {
        this.crawlData(this.props.Symbol);
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps Financial', this.props, nextProps)
        if (this.props.Symbol !== nextProps.Symbol) {
            this.crawlData(nextProps.Symbol);
        }
    }

    crawlData = (symbol) => {
        if (!symbol) return;
        axios({
            method: 'get',
            url: getYearlyFinancialInfoUrl(symbol)
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
            url: getQuarterlyFinancialInfoUrl(symbol)
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
            url: getLastestFinancialReportsUrl(symbol)
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

const mapStateToProps = state => {
    console.log(state);
    return {
        Symbol: state.stock.Symbol
    }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Financial);