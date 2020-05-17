import React from 'react';
import moment from 'moment';
import axios from 'axios';
import { connect } from 'react-redux';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { get } from 'lodash';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';

import {
    mapArrayToKeyValue,
    mapDataTwoDate
} from '../utils/all';
import {
    getConfigGetCreateUrl,
    getStockFilter,
    getCompanyInfoUrl
} from '../utils/request';
import { IStock } from '../types'

interface IProps {
    startDate: string,
    endDate: string,
    stocks: IStock,
    symbol: any,
    lastUpdatedDate: any,
}

interface IState {
    dataChart: any
}

class Analysis extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            dataChart: []
        }
    }

    componentDidMount() {
        this.crawData();
    }

    componentDidUpdate(preProps) {
        console.log('componentDidUpdate Analysis', this.props, preProps)
        if (this.props.startDate !== preProps.startDate) {
            this.crawData();
        }
    }

    crawData = async () => {
        const { stocks, symbol, startDate, endDate, lastUpdatedDate } = this.props;
        let data1 = [];
        let data2 = []
        let CompanyInfoObj = null

        await axios({
            url: getCompanyInfoUrl(symbol),
            method: 'get',
        })
            .then(response => {
                CompanyInfoObj = response.data
            })
            .catch(error => {
                console.log(error)
            })

        if (!lastUpdatedDate.value || !CompanyInfoObj) return

        await axios({
            url: getStockFilter(),
            method: 'post',
            data: {
                Date: endDate ? endDate : lastUpdatedDate,
                ICBCode: CompanyInfoObj.ICBCode,
            }
        })
            .then(response => {
                data1 = response.data
            })
            .catch(error => {
                console.log(error)
            })

        await axios({
            url: getStockFilter(),
            method: 'post',
            data: {
                Date: startDate ? startDate : moment(lastUpdatedDate).add(-1, 'days').format('YYYY-MM-DD') + 'T00:00:00Z',
                ICBCode: CompanyInfoObj.ICBCode,
            }
        })
            .then(response => {
                data2 = response.data
            })
            .catch(error => {
                console.log(error)
            })

        let mappedData = mapDataTwoDate(data1, data2, mapArrayToKeyValue(Object.values(stocks)));
        if (!mappedData.length) return;

        const rowData = mappedData.sort((a, b) => b.MarketCap - a.MarketCap).slice(0, 10);
        const dataChart = [];
        for (let i = 0; i < rowData.length; i++) {
            let item = {
                stock: rowData[i].Stock,
            }
            item[startDate ? startDate : moment(lastUpdatedDate).add(-1, 'days').format('YYYY-MM-DD') + 'T00:00:00Z'] = rowData[i].YesterdayPriceClose
            item[endDate ? endDate : lastUpdatedDate] = rowData[i].PriceClose

            dataChart.push(item)
        }
        console.log(dataChart, rowData)

        if (startDate) {
            this.setState({
                dataChart
            })
        } else {
            this.setState({
                dataChart
            })
        }
    }

    render() {
        const { dataChart } = this.state;
        const { startDate, endDate } = this.props;
        return (
            <div>
                <BarChart
                    width={500}
                    height={300}
                    data={dataChart}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="stock" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={startDate} fill="#8884d8" />
                    <Bar dataKey={endDate} fill="#82ca9d" />
                </BarChart>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedSymbol: get(state, 'selectedSymbol'),
        stocks: get(state, 'stocks'),
        lastUpdatedDate: get(state, 'lastUpdatedDate') || {},
    }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Analysis);