import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import moment from 'moment';
import { DatePicker, Tabs, Table, Button } from 'antd';

import {
    getHistoricalQuotesUrl,
    getHistoricalQuotesUpdateUrl,
} from '../../request';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const HistoricalQuotesPastPriceColumns = [
    {
        title: 'NGÀY',
        dataIndex: 'Date',
        key: 'Date',
    },
    {
        title: 'THAY ĐỔI',
        render: params => {
            return ((params.PriceClose - params.PriceBasic) / 1000).toFixed(2)
        }
    },
    {
        title: '%',
        render: params => {
            return ((params.PriceClose - params.PriceBasic) / (params.PriceBasic)).toFixed(2)
        }
    },
    {
        title: 'MỞ CỬA',
        dataIndex: 'PriceOpen',
        key: 'PriceOpen',
    },
    {
        title: 'CAO NHẤT',
        dataIndex: 'PriceHigh',
        key: 'PriceHigh',
    },
    {
        title: 'THẤP NHẤT',
        dataIndex: 'PriceLow',
        key: 'PriceLow',
    },
    {
        title: 'ĐÓNG CỬA',
        dataIndex: 'PriceClose',
        key: 'PriceClose',
    },
    {
        title: 'TRUNG BÌNH',
        key: 'PriceAverage',
        render: params => {
            return (params.PriceAverage).toFixed(0)
        }
    },
    {
        title: 'ĐÓNG CỬA ĐC',
        dataIndex: 'AdjClose',
        key: 'AdjClose',
    },
    {
        title: 'KHỐI LƯỢNG',
        dataIndex: 'Volume',
        key: 'Volume',
    }
]

const HistoricalQuotesForeignTradeColumns = [
    {
        title: 'NGÀY',
        dataIndex: 'Date',
        key: 'Date',
    },
    {
        title: 'ROOM NN',
        render: params => {
            return params.CurrentForeignRoom
        }
    },
    {
        title: 'MUA',
        render: params => {
            return params.BuyForeignQuantity
        }
    },
    {
        title: 'BÁN',
        render: params => {
            return params.SellForeignQuantity
        }
    },
    {
        title: 'MUA-BÁN',
        render: params => {
            return params.BuyForeignQuantity - params.SellForeignQuantity
        }
    },
    {
        title: 'MUA',
        render: params => {
            return params.BuyForeignValue
        }
    },
    {
        title: 'BÁN',
        render: params => {
            return params.SellForeignValue
        }
    },
    {
        title: 'MUA-BÁN',
        render: params => {
            return params.BuyForeignValue - params.SellForeignValue
        }
    }
]

const HistoricalQuotesSupplyDemandColumns = [
    {
        title: 'NGÀY',
        dataIndex: 'Date',
        key: 'Date',
    },
    {
        title: 'SL ĐẶT MUA',
        render: params => {
            return params.BuyCount
        }
    },
    {
        title: 'KL ĐẶT MUA',
        render: params => {
            return params.BuyQuantity
        }
    },
    {
        title: 'SL ĐẶT BÁN',
        render: params => {
            return params.SellCount
        }
    },
    {
        title: 'KL ĐẶT BÁN',
        render: params => {
            return params.SellQuantity
        }
    },
    {
        title: 'KL KHỚP',
        render: params => {
            return params.Volume
        }
    },
    {
        title: 'GT KHỚP (1000 VND)',
        render: params => {
            return params.TotalValue
        }
    }
]

class Price extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            HistoricalQuotesArray: [],
            startDate: '',
            endDate: ''
        }
    }

    componentDidMount() {
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
        if (!symbol) return;
        axios({
            method: 'get',
            url: getHistoricalQuotesUrl(symbol, startDate, endDate),
        })
            .then(response => {
                if (response.data) {
                    this.setState({
                        HistoricalQuotesArray: response.data.reverse()
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

    udpateHistoricalQuotes = (symbol, resolve) => {
        const { startDate, endDate } = this.state;
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

    udpateHistoricalQuotesPartial = (start, count) => {
        let listPromises = [];
        const arr = cloneDeep(this.props.AllStocks);
        const arr1 = arr.slice(start, count)
        arr1.map(item => {
            item.Symbol && listPromises.push(
                new Promise(resolve => {
                    this.udpateHistoricalQuotes(item.Symbol, resolve);
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
        const lastUpdatedDate = await this.getLastUpdatedDate();
        const todayDate = moment();
        if (lastUpdatedDate === todayDate) return;
        const startDate = moment(lastUpdatedDate).add(1, 'days');
        const endDate = todayDate;


        // await this.udpateHistoricalQuotesPartial(0, 1, startDate, endDate);
        // await this.udpateHistoricalQuotesPartial(0, 500);
        // await this.udpateHistoricalQuotesPartial(500, 1000);
        // await this.udpateHistoricalQuotesPartial(1000, 2000);
        await this.updateLastUpdatedDate();
    }

    udpateHistoricalQuotesDaily = async () => {
        await
            await this.udpateHistoricalQuotesPartial(0, 500);
        await this.udpateHistoricalQuotesPartial(500, 1000);
        await this.udpateHistoricalQuotesPartial(1000, 2000);
    }

    render() {
        const { HistoricalQuotesArray } = this.state;
        return (
            <div>
                <div>
                    <RangePicker onChange={this.onChange} />
                    <Button onClick={this.crawlData}>Xem</Button>
                    <Button onClick={() => this.udpateHistoricalQuotes(this.props.Symbol)}>Update</Button>
                    <Button onClick={this.udpateHistoricalQuotesAll}>Update all</Button>
                    <Button onClick={this.udpateHistoricalQuotesDaily}>Update daily all</Button>
                </div>
                <div>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Giá quá khứ" key="1">
                            <Table dataSource={HistoricalQuotesArray} columns={HistoricalQuotesPastPriceColumns} />
                        </TabPane>
                        <TabPane tab="Giao dịch NĐTNN" key="2">
                            <Table dataSource={HistoricalQuotesArray} columns={HistoricalQuotesForeignTradeColumns} />
                        </TabPane>
                        <TabPane tab="Cung cầu" key="3">
                            <Table dataSource={HistoricalQuotesArray} columns={HistoricalQuotesSupplyDemandColumns} />
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