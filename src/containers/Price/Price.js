import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import moment from 'moment';
import { DatePicker, Tabs, Table, Button, Spin } from 'antd';

import {
    getHistoricalQuotesUrl,
    getHistoricalQuotesUpdateUrl,
    getConfigGetCreateUrl,
    getConfigRetrieveUpdateDeleteUrl
} from '../../request';
import { formatNumber } from '../../utils/all';


const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const HistoricalQuotesPastPriceColumns = [
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
            const content = ((params.PriceClose - params.PriceBasic) / 1000).toFixed(2)
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
            const content = ((params.PriceClose - params.PriceBasic) / (params.PriceBasic)).toFixed(2)
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

const HistoricalQuotesForeignTradeColumns = [
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
]

const HistoricalQuotesSupplyDemandColumns = [
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
]

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
        this.getLastUpdatedDate()
        this.crawlData();
    }

    componentDidUpdate(preProps) {
        console.log('componentDidUpdate Price', this.props, preProps)
        if (this.props.Symbol !== preProps.Symbol) {
            this.crawlData();
        }
    }

    crawlData = () => {
        const { startDate, endDate } = this.state;
        const { Symbol: symbol } = this.props;
        if (!symbol || !startDate || !endDate) return;
        axios({
            method: 'get',
            url: getHistoricalQuotesUrl(symbol, startDate, endDate),
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

    getLastUpdatedDate = async () => {
        let result = null;
        await axios({
            url: getConfigGetCreateUrl('LAST_UPDATED_HISTORICAL_QUOTES'),
            method: 'get'
        })
            .then(response => {
                console.log(response)
                if (response.data) {
                    result = response.data
                    this.setState({
                        lastUpdatedDate: result.value
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
        return result
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
    console.log(state);
    return {
        Symbol: state.stock.Symbol,
        AllStocks: state.stock.AllStocks,
    }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Price);