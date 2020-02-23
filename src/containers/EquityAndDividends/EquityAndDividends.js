import React from 'react';
import axios from 'axios';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import {
    getEquityAndDividendsUrl,
} from '../../request';

const data = [
    {
        name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
        name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
        name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
        name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
        name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
        name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
        name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
];

export default class EquityAndDividends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            EquityAndDividendsArray: []
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: getEquityAndDividendsUrl(),
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