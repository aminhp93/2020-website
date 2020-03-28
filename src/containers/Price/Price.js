import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { DatePicker, Tabs, Table } from 'antd';

import {
    getHistoricalQuotesUrl
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
            HistoricalQuotesArray: []
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
        const { Symbol: symbol } = this.props;
        if (!symbol) return;
        axios({
            method: 'get',
            url: getHistoricalQuotesUrl(symbol),
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
    }

    render() {
        const { HistoricalQuotesArray } = this.state;
        return (
            <div>
                <div>
                    <RangePicker onChange={this.onChange} />
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
        Symbol: state.stock.Symbol
    }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Price);