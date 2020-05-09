import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { cloneDeep, get } from 'lodash';
import moment from 'moment';
import { DatePicker, Tabs, Table, Button, Spin } from 'antd';

import {
    getHistoricalQuotesUpdateUrl,
    getConfigRetrieveUpdateDeleteUrl
} from '../urls';
import {
    HistoricalQuotesPastPriceColumns,
    HistoricalQuotesForeignTradeColumns,
    HistoricalQuotesSupplyDemandColumns
} from '../utils/columnDefs';

import {
    getHistoricalQuotesAction
} from '../actions/stock';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;


class Price extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            HistoricalQuotesArray: [],
            startDate: moment().add(-7, 'days').format('YYYY-MM-DD'),
            endDate: moment().format('YYYY-MM-DD'),
            lastUpdatedDate: '',
            loading: false,
        }
    }

    componentDidMount() {
        this.crawlData();
    }

    componentDidUpdate(preProps) {
        console.log('componentDidUpdate Price', this.props, preProps)
        if (this.props.SelectedSymbol !== preProps.SelectedSymbol) {
            this.crawlData();
        }
    }

    crawlData = async () => {
        const { startDate, endDate } = this.state;
        try {
            const res = await this.props.getHistoricalQuotes({ startDate, endDate })
            console.log(53, res);
            this.setState({
                HistoricalQuotesArray: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }

    onChange = (date, dateString) => {
        console.log(date, dateString);
        if (dateString && dateString.length === 2) {
            this.setState({
                startDate: dateString[0],
                endDate: dateString[1]
            })
        }
    }

    udpateHistoricalQuotes = (symbol, resolve, startDate, endDate) => {
        if (!startDate || !endDate) {
            startDate = this.state.startDate;
            endDate = this.state.endDate;
        }
        console.log(216, startDate, endDate)
        if (!symbol) return;
        axios({
            method: 'put',
            url: getHistoricalQuotesUpdateUrl(symbol, startDate, endDate)
        })
            .then(response => {
                console.log(response)
                if (response.data) {
                    resolve && resolve(response.data)
                }
            })
            .catch(error => {
                console.log(error);
                resolve && resolve(error)
            })
    }

    udpateHistoricalQuotesPartial = (start, count, startDate, endDate) => {
        let listPromises = [];
        const arr = cloneDeep(this.props.AllStocks);
        const arr1 = arr.slice(start, count)
        arr1.map(item => {
            item.Symbol && listPromises.push(
                new Promise(resolve => {
                    this.udpateHistoricalQuotes(item.Symbol, resolve, startDate, endDate);
                })
            );
        });

        return Promise.all(listPromises)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    udpateHistoricalQuotesAll = async () => {
        await this.udpateHistoricalQuotesPartial(0, 500);
        await this.udpateHistoricalQuotesPartial(500, 1000);
        await this.udpateHistoricalQuotesPartial(1000, 2000);
    }

    updateLastUpdatedDate = (obj) => {
        axios({
            url: getConfigRetrieveUpdateDeleteUrl(obj.id),
            method: 'put',
            data: {
                key: obj.key,
                value: moment().format('YYYY-MM-DD') + 'T00:00:00Z'
            }
        })
            .then(response => {
                console.log(response)
                if (response.data) {
                    this.setState({
                        lastUpdatedDate: response.data.value
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    udpateHistoricalQuotesDaily = async () => {
        this.setState({ loading: true })
        const lastUpdatedDate = await this.getLastUpdatedDate();
        const todayDate = moment().format('YYYY-MM-DD');
        if (!lastUpdatedDate || !lastUpdatedDate.value) return;
        if (lastUpdatedDate.value === todayDate) return;
        const startDate = moment(lastUpdatedDate.value).add(1, 'days').format('YYYY-MM-DD');
        const endDate = todayDate;
        await this.udpateHistoricalQuotesPartial(0, 500, startDate, endDate);
        await this.udpateHistoricalQuotesPartial(500, 1000, startDate, endDate);
        await this.udpateHistoricalQuotesPartial(1000, 2000, startDate, endDate);
        await this.updateLastUpdatedDate(lastUpdatedDate);
        this.setState({ loading: false })
    }

    render() {
        const { HistoricalQuotesArray, lastUpdatedDate, startDate, endDate, loading } = this.state;
        if (loading) return <Spin />
        return (
            <div>
                <div>
                    <RangePicker defaultValue={[moment(startDate), moment(endDate)]} onChange={this.onChange} />
                    <div>Last updated {lastUpdatedDate ? lastUpdatedDate : ''}</div>
                    <Button onClick={this.crawlData}>Xem</Button>
                    {/* <Button onClick={() => this.udpateHistoricalQuotes(this.props.Symbol)}>Update</Button> */}
                    {/* <Button onClick={this.udpateHistoricalQuotesAll}>Update all</Button> */}
                    <Button onClick={this.udpateHistoricalQuotesDaily}>Update daily all</Button>
                </div>
                <div>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Giá quá khứ" key="1">
                            <Table dataSource={HistoricalQuotesArray} columns={HistoricalQuotesPastPriceColumns} size='small' />
                        </TabPane>
                        <TabPane tab="Giao dịch NĐTNN" key="2">
                            <Table dataSource={HistoricalQuotesArray} columns={HistoricalQuotesForeignTradeColumns} size='small' />
                        </TabPane>
                        <TabPane tab="Cung cầu" key="3">
                            <Table dataSource={HistoricalQuotesArray} columns={HistoricalQuotesSupplyDemandColumns} size='small' />
                        </TabPane>
                    </Tabs>
                </div>

            </div>
        )
    }
}


const mapStateToProps = state => {
    const stock = get(state, 'stock') || {};
    return {
        SelectedSymbol: get(stock, 'SelectedSymbol') || '',
        AllStocksObj: get(stock, 'AllStocksObj') || {},
        LastUpdatedDate: get(stock, 'LastUpdatedDate') || '',
        modal: get(state, 'modal') || {}
    }
}

const mapDispatchToProps = {
    getHistoricalQuotes: getHistoricalQuotesAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Price);