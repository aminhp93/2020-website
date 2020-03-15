import React from 'react';

import { Tabs, Select, Spin } from 'antd';
import { connect } from 'react-redux';

import 'antd/dist/antd.css';
import '../../css/index.css';

import '../../css/App.css';
import '../../css/EquityAndDividends.css';
import '../../css/Financial.css';
import '../../css/News.css';
import '../../css/Price.css';
import '../../css/Profile.css';
import '../../css/Stakeholder.css';
import '../../css/Technical.css';
import '../../css/Transaction.css';

import EquityAndDividends from '../EquityAndDividends/EquityAndDividends';
import Financial from '../Financial/Financial';
import News from '../News/News';
import Price from '../Price/Price';
import Profile from '../Profile/Profile';
import Stakeholder from '../Stakeholder/Stakeholder';
import Technical from '../Technical/Technical';
import Transaction from '../Transaction/Transaction';
import Analysis from '../Analysis/Analysis';
import debounce from 'lodash/debounce';

import {
    setSymbol,
} from '../../actions/stock';
import Axios from 'axios';

const { TabPane } = Tabs;
const { Option } = Select;

const SAMPLE_STOCK_LIST = [
    {
        Symbol: 'VND'
    },
    {
        Symbol: 'AAV'
    },
    {
        Symbol: 'VPB'
    }
]

class Stock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            value: [],
            fetching: false,
        }

        this.lastFetchId = 0;
        this.fetchUser = debounce(this.fetchUser, 800);

    }

    componentDidMount() {
        this.props.setSymbol('FPT')
        // Axios({
        //     method: 'get',
        //     url: 'http://localhost:8000/api/Data/Companies/CompanyInfo/?symbol=FPT'
        // })
        //     .then(response => {
        //         console.log(response)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
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
        console.log('fetching user', value);
        this.lastFetchId += 1;
        const fetchId = this.lastFetchId;
        this.setState({ data: [], fetching: true });
        fetch('https://randomuser.me/api/?results=5')
            .then(response => response.json())
            .then(body => {
                if (fetchId !== this.lastFetchId) {
                    // for fetch callback order
                    return;
                }
                this.setState({ data: SAMPLE_STOCK_LIST, fetching: false });
            });
    };

    render() {
        const { fetching, data, value } = this.state;

        return (
            <div className="App">
                <div className="App-header">Header - Current Symbol {this.props.Symbol}</div>
                <div className="App-container">
                    <div className="App-navigation">
                        <Select
                            mode="multiple"
                            labelInValue
                            value={value}
                            placeholder="Select stock"
                            notFoundContent={fetching ? <Spin size="small" /> : null}
                            filterOption={false}
                            onSearch={this.fetchUser}
                            onChange={this.handleChange}
                            style={{ width: '100%' }}
                        >
                            {data.map(d => (
                                <Option key={d.Symbol}>{d.Symbol}</Option>
                            ))}
                        </Select>
                        <div>
                            <Tabs defaultActiveKey="1" tabPosition="left">
                                <TabPane tab="OverallMarket" key="1">
                                    <div className="App-content">
                                        <div>Content</div>
                                        <div>
                                            <Tabs defaultActiveKey="7">
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
    return {
        Symbol: state.stock.Symbol
    }

}

const mapDispatchToProps = {
    setSymbol
}

export default connect(mapStateToProps, mapDispatchToProps)(Stock);
