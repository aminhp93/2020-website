import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import {
    getEquityAndDividendsUrl,
} from '../../request';


class EquityAndDividends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            EquityAndDividendsArray: []
        }
    }

    componentDidMount() {
        this.crawlData(this.props.Symbol);
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps EquityAndDividends', this.props, nextProps)
        if (this.props.Symbol !== nextProps.Symbol) {
            this.crawlData(nextProps.Symbol);
        }
    }

    crawlData = (symbol) => {
        if (!symbol) return;
        axios({
            method: 'get',
            url: getEquityAndDividendsUrl(symbol),
        })
            .then(response => {
                if (response.data) {
                    this.setState({
                        EquityAndDividends: response.data
                    })
                }
            })
            .catch(error => console.log(error))
    }

    renderChart = (index) => {
        const { EquityAndDividends } = this.state;
        return (
            <BarChart
                width={500}
                height={300}
                data={EquityAndDividends}
                margin={{
                    top: 50, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={index} fill="lightblue" />
            </BarChart>
        )
    }

    render() {
        return (
            <div className="EquityAndDividends">
                <div className="EquityAndDividends-top-container">
                    <div className="EquityAndDividends-chart1 bg-white">
                        <div>CỔ TỨC BẰNG TIỀN</div>
                        {this.renderChart('CashDividend')}
                    </div>
                    <div className="bg-white">
                        <div>CỔ TỨC BẰNG CỔ PHIẾU</div>
                        {this.renderChart('StockDividend')}
                    </div>
                </div>
                <div className="EquityAndDividends-bottom-container">
                    <div className="EquityAndDividends-chart3 bg-white">
                        <div>VỐN CHỦ SỞ HỮU (TỶ)</div>
                        {this.renderChart('StockHolderEquity')}
                    </div>
                    <div className="bg-white">

                        <div>TÀI SẢN (TỶ)</div>
                        {this.renderChart('TotalAssets')}

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

export default connect(mapStateToProps, mapDispatchToProps)(EquityAndDividends);