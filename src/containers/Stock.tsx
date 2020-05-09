import React from 'react';
import { Tabs, Select, Spin, Button, Modal } from 'antd';
import { connect } from 'react-redux';
import { debounce, get } from 'lodash';


import 'antd/dist/antd.css';
import '../css/index.css';

import '../css/App.css';
import '../css/EquityAndDividends.css';
import '../css/Financial.css';
import '../css/News.css';
import '../css/Price.css';
import '../css/Profile.css';
import '../css/Stakeholder.css';
import '../css/Technical.css';
import '../css/Transaction.css';
import '../css/OverviewAnalysis.css';
import '../css/MarketNews.css';
import '../css/Note.css';

import EquityAndDividends from './EquityAndDividends';
import Financial from './Financial';
import News from './News';
import Price from './Price';
import Profile from './Profile';
import Stakeholder from './Stakeholder';
import Technical from './Technical';
import Transaction from './Transaction';
import Analysis from './Analysis/Analysis';


import {
    setSymbolAction,
    getLastUpdatedDateAction,
    getMarketTradingStatisticAction
} from '../actions/stock';

import {
    closeModal,
} from '../actions/modal';

const { TabPane } = Tabs;
const { Option } = Select;

interface IProps {
    AllStocksObj: any,
    SelectedSymbol: string,
    LastUpdatedDate: string,
    modal: any,
    setSymbol: any,
    getLastUpdatedDate: any,
    getMarketTradingStatistic: any,
}

interface IState {
    data: any,
    value: any,
    fetching: boolean,
    loading: boolean,
    visible: boolean,
}

class Stock extends React.Component<IProps, IState> {
    lastFetchId: any;

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            value: [],
            fetching: false,
            loading: true,
            visible: false
        }
        this.lastFetchId = 0;
        this.fetchUser = debounce(this.fetchUser, 800);
    }

    async componentDidMount() {
        try {
            this.setState({ loading: true })
            await this.props.getLastUpdatedDate();
            await this.props.getMarketTradingStatistic();
            this.setState({ loading: false })
        } catch (error) {
            this.setState({ loading: false })
        }
    }

    handleChange = value => {
        this.setState({
            value,
            data: [],
            fetching: false,
        }, () => {
            value && value.length && this.props.setSymbol(value[0]['key']);
        });
    };


    fetchUser = value => {
        this.setState({
            data: [],
            fetching: true
        }, () => {
            const filteredStocks = Object.values(this.props.AllStocksObj).filter(item => {
                return (item.Symbol || '').toLowerCase().includes((value || '').toLowerCase())
            })
            this.setState({
                data: filteredStocks,
                fetching: false
            })
        });
    };

    render() {
        const { fetching, data, value, loading } = this.state;
        const { modal, SelectedSymbol, LastUpdatedDate } = this.props;
        const { isOpen } = modal;
        if (loading) return <Spin size='large' />
        return (
            <div className="App">
                <div className="App-header">

                    <div className="App-search">
                        <Select
                            mode="multiple"
                            labelInValue
                            value={value}
                            placeholder="Select stock"
                            notFoundContent={fetching ? <Spin size="small" /> : null}
                            filterOption={false}
                            onSearch={this.fetchUser}
                            onChange={this.handleChange}
                            style={{ width: '200px' }}
                        >
                            {data.map(d => (
                                <Option key={d.Symbol}>{d.Symbol}</Option>
                            ))}
                        </Select>
                    </div>
                    <div className="App-header-symbol">
                        <div>Current Symbol {SelectedSymbol}</div>
                        <div>Updated at: {LastUpdatedDate}</div>
                    </div>

                </div>
                <div className="App-container">
                    <div className="App-navigation">

                        <div>
                            <Tabs defaultActiveKey="1" tabPosition="left">
                                <TabPane tab="OverallMarket1" key="1">
                                    <div className="App-content">
                                        <div>Content2</div>
                                        <div>
                                            <Tabs defaultActiveKey="6">
                                                <TabPane tab="Transaction" key="1">
                                                    <Transaction />
                                                </TabPane>
                                                <TabPane tab="Profile" key="2">
                                                    <Profile />
                                                </TabPane>
                                                <TabPane tab="Stakeholder" key="3">
                                                    <Stakeholder />
                                                </TabPane>
                                                <TabPane tab="EquityAndDividends" key="4">
                                                    <EquityAndDividends />
                                                </TabPane>
                                                <TabPane tab="News" key="5">
                                                    <News />
                                                </TabPane>
                                                <TabPane tab="Price" key="6">
                                                    <Price />
                                                </TabPane>
                                                <TabPane tab="Financial" key="7">
                                                    <Financial />
                                                </TabPane>
                                                <TabPane tab="Technical" key="8">
                                                    <Technical />
                                                </TabPane>
                                            </Tabs>
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane tab="Analysis" key="2">
                                    <Analysis />
                                </TabPane>

                            </Tabs>
                        </div>
                    </div>

                </div>


            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    const stock = get(state, 'stock') || {};
    return {
        SelectedSymbol: get(stock, 'SelectedSymbol') || '',
        AllStocksObj: get(stock, 'AllStocksObj') || {},
        LastUpdatedDate: get(stock, 'LastUpdatedDate') || '',
        modal: get(state, 'modal') || {}
    }

}

const mapDispatchToProps = {
    setSymbol: setSymbolAction,
    getLastUpdatedDate: getLastUpdatedDateAction,
    getMarketTradingStatistic: getMarketTradingStatisticAction,
    closeModal
}

export default connect(mapStateToProps, mapDispatchToProps)(Stock);
