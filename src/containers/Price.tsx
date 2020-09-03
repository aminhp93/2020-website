import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { cloneDeep, get } from 'lodash';
import moment from 'moment';
import { DatePicker, Tabs, Table, Button, Spin } from 'antd';

import {
    getHistoricalQuotesUrl,
    getHistoricalQuotesUpdateUrl,
} from '../utils/request';

import { IStock } from '../types'
import { formatNumber } from '../utils/all'
import { updateLastUpdatedDate } from '../reducers/lastUpdatedDate';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

interface IProps {
    selectedSymbol: string,
    stocks: IStock,
    lastUpdatedDate: any,
    updateLastUpdatedDate: any,
}

interface IState {
    HistoricalQuotesArray: any,
    startDate: string,
    endDate: string,
    loading: boolean,
}

class Price extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            HistoricalQuotesArray: [],
            startDate: moment().add(-7, 'days').format('YYYY-MM-DD'),
            endDate: moment().format('YYYY-MM-DD'),
            loading: false,
        }
    }

    componentDidMount() {
        this.crawlData();
    }

    componentDidUpdate(preProps) {
        console.log('componentDidUpdate Price', this.props, preProps)
        if (this.props.selectedSymbol !== preProps.selectedSymbol) {
            this.crawlData();
        }
    }

    crawlData = () => {
        const { startDate, endDate } = this.state;
        const { selectedSymbol } = this.props;
        if (!selectedSymbol || !startDate || !endDate) return;
        axios({
            method: 'get',
            url: getHistoricalQuotesUrl(selectedSymbol, startDate, endDate),
        })
            .then(response => {
                if (response.data) {
                    this.setState({
                        HistoricalQuotesArray: response.data
                    })
                }
            })
            .catch(error => console.log(error))
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
        const arr = cloneDeep(Object.values(this.props.stocks));
        const arr1 = arr.slice(start, count)
        arr1.forEach(item => {
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

    udpateHistoricalQuotesDaily = async () => {

        const { lastUpdatedDate } = this.props;
        const lastUpdatedDateValue = lastUpdatedDate.value
        const todayDate = moment().format('YYYY-MM-DD');
        const next1Day = moment(lastUpdatedDateValue).add(1, 'days').format('YYYY-MM-DD');
        const next2Day = moment(lastUpdatedDateValue).add(2, 'days').format('YYYY-MM-DD');
        if (
            !lastUpdatedDateValue
            || lastUpdatedDateValue === todayDate
            || (moment(lastUpdatedDateValue).format('dddd') === 'Friday' && next1Day === todayDate)
            || (moment(lastUpdatedDateValue).format('dddd') === 'Friday' && next2Day === todayDate)
        ) return;

        const startDate = next1Day;
        const endDate = todayDate;
        this.setState({ loading: true })
        await this.udpateHistoricalQuotesPartial(0, 500, startDate, endDate);
        await this.udpateHistoricalQuotesPartial(500, 1000, startDate, endDate);
        await this.udpateHistoricalQuotesPartial(1000, 2000, startDate, endDate);
        await this.props.updateLastUpdatedDate(lastUpdatedDate);
        this.setState({ loading: false })
    }

    render() {
        const { HistoricalQuotesArray, startDate, endDate, loading } = this.state;
        if (loading) return <Spin />
        return (
            <div>
                <div>
                    <RangePicker defaultValue={[moment(startDate), moment(endDate)]} onChange={this.onChange} />
                    <Button onClick={this.crawlData}>Xem</Button>
                    <Button onClick={this.udpateHistoricalQuotesDaily}>Update daily all</Button>
                </div>
                <div>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Giá quá khứ" key="1">
                            <Table dataSource={HistoricalQuotesArray} columns={[
                                {
                                    title: 'NGÀY',
                                    render: params => {
                                        return moment(params.Date).format('YYYY-MM-DD')
                                    }
                                },
                                {
                                    title: 'THAY ĐỔI',
                                    align: 'right',
                                    render: params => {
                                        const content = Number(((params.PriceClose - params.PriceBasic) / 1000).toFixed(2))
                                        let className = '';
                                        if (content > 0) {
                                            className = 'green';
                                        } else if (content < 0) {
                                            className = 'red';
                                        }
                                        return <div className={className}>{content}</div>
                                    }
                                },
                                {
                                    title: '%',
                                    align: 'right',
                                    render: params => {
                                        const content = Number(((params.PriceClose - params.PriceOpen) * 100 / (params.PriceOpen)).toFixed(2))
                                        let className = '';
                                        if (content > 0) {
                                            className = 'green';
                                        } else if (content < 0) {
                                            className = 'red';
                                        }
                                        return <div className={className}>{content}</div>
                                    }
                                },
                                {
                                    title: 'MỞ CỬA',
                                    align: 'right',
                                    render: params => {
                                        return (params.PriceOpen / 1000).toFixed(2)
                                    }
                                },
                                {
                                    title: 'CAO NHẤT',
                                    align: 'right',
                                    render: params => {
                                        return (params.PriceHigh / 1000).toFixed(2)
                                    }
                                },
                                {
                                    title: 'THẤP NHẤT',
                                    align: 'right',
                                    render: params => {
                                        return (params.PriceLow / 1000).toFixed(2)
                                    }
                                },
                                {
                                    title: 'ĐÓNG CỬA',
                                    align: 'right',
                                    render: params => {
                                        return (params.PriceClose / 1000).toFixed(2)
                                    }
                                },
                                {
                                    title: 'TRUNG BÌNH',
                                    align: 'right',
                                    render: params => {
                                        return (params.PriceAverage / 1000).toFixed(2)
                                    }
                                },
                                {
                                    title: 'ĐÓNG CỬA ĐC',
                                    align: 'right',
                                    render: params => {
                                        return (params.AdjClose / 1000).toFixed(2)
                                    }
                                },
                                {
                                    title: 'KHỐI LƯỢNG',
                                    align: 'right',
                                    render: params => {
                                        return formatNumber(params.Volume)
                                    }
                                }
                            ]
                            } size='small' />
                        </TabPane>
                        <TabPane tab="Giao dịch NĐTNN" key="2">
                            <Table dataSource={HistoricalQuotesArray} columns={[
                                {
                                    title: 'NGÀY',
                                    render: params => {
                                        return moment(params.Date).format('YYYY-MM-DD')
                                    }
                                },
                                {
                                    title: 'ROOM NN',
                                    align: 'right',
                                    render: params => {
                                        return formatNumber(params.CurrentForeignRoom)
                                    }
                                },
                                {
                                    title: 'KL MUA',
                                    align: 'right',
                                    render: params => {
                                        return formatNumber(params.BuyForeignQuantity)
                                    }
                                },
                                {
                                    title: 'KL BÁN',
                                    align: 'right',
                                    render: params => {
                                        return formatNumber(params.SellForeignQuantity)
                                    }
                                },
                                {
                                    title: 'MUA-BÁN',
                                    align: 'right',
                                    render: params => {
                                        return formatNumber(params.BuyForeignQuantity - params.SellForeignQuantity)
                                    }
                                },
                                {
                                    title: 'GT MUA',
                                    align: 'right',
                                    render: params => {
                                        return formatNumber(params.BuyForeignValue)
                                    }
                                },
                                {
                                    title: 'GT BÁN',
                                    align: 'right',
                                    render: params => {
                                        return formatNumber(params.SellForeignValue)
                                    }
                                },
                                {
                                    title: 'MUA-BÁN',
                                    align: 'right',
                                    render: params => {
                                        return formatNumber(params.BuyForeignValue - params.SellForeignValue)
                                    }
                                }
                            ]} size='small' />
                        </TabPane>
                        <TabPane tab="Cung cầu" key="3">
                            <Table dataSource={HistoricalQuotesArray} columns={[
                                {
                                    title: 'NGÀY',
                                    render: params => {
                                        return moment(params.Date).format('YYYY-MM-DD')
                                    }
                                },
                                {
                                    title: 'SL ĐẶT MUA',
                                    align: 'right',
                                    render: params => {
                                        return formatNumber(params.BuyCount)
                                    }
                                },
                                {
                                    title: 'KL ĐẶT MUA',
                                    align: 'right',
                                    render: params => {
                                        return formatNumber(params.BuyQuantity)
                                    }
                                },
                                {
                                    title: 'SL ĐẶT BÁN',
                                    align: 'right',
                                    render: params => {
                                        return formatNumber(params.SellCount)
                                    }
                                },
                                {
                                    title: 'KL ĐẶT BÁN',
                                    align: 'right',
                                    render: params => {
                                        return formatNumber(params.SellQuantity)
                                    }
                                },
                                {
                                    title: 'KL KHỚP',
                                    align: 'right',
                                    render: params => {
                                        return formatNumber(params.Volume)
                                    }
                                },
                                {
                                    title: 'GT KHỚP (1000 VND)',
                                    align: 'right',
                                    render: params => {
                                        return formatNumber(params.TotalValue)
                                    }
                                }
                            ]} size='small' />
                        </TabPane>
                    </Tabs>
                </div>

            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        selectedSymbol: get(state, 'selectedSymbol'),
        stocks: get(state, 'stocks'),
        lastUpdatedDate: get(state, 'lastUpdatedDate')
    }
}

const mapDispatchToProps = {
    updateLastUpdatedDate
}

export default connect(mapStateToProps, mapDispatchToProps)(Price);